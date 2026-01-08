import { useMemo, useState } from "react";

const idUnique = () => Date.now() + Math.floor(Math.random() * 1000);//permet de crée un id unique 

export default function useTaches() {
  const [taches, setTaches] = useState([
    { id: 100, texte: "Devenir freelance", parentId: null, termine: false },
    { id: 101, texte: "Créer un portfolio", parentId: 100, termine: false },
    { id: 102, texte: "Trouver 3 clients", parentId: 100, termine: false },
    { id: 103, texte: "Fixer ses tarifs", parentId: 100, termine: false },
    { id: 200, texte: "Être en meilleure forme", parentId: null, termine: false },
    { id: 201, texte: "Aller à la salle 3x / semaine", parentId: 200, termine: false },
    { id: 202, texte: "Marcher 8 000 pas / jour", parentId: 200, termine: false },
  ]);
// parentID : null c'est un objectif parent
//parentID : "100" c'est un sous objectif lié a un parent
// terminé: si la tache est accompli ou non


  const objectifs = useMemo(() => taches.filter(t => t.parentId === null), [taches]); //filtre les parnt uniquement
  const enfants = parentId => taches.filter(t => t.parentId === parentId); //renvoie les sous objectif

  const objectifsTermines = useMemo(() => objectifs.filter(o => o.termine), [objectifs]);  //affiché dans la modale terminé
  const objectifsActifs = useMemo(() => objectifs.filter(o => !o.termine), [objectifs]); // affiché dans la liste principale

  const ajouterObjectif = texteBrut => {
    const texte = (texteBrut || "").trim();
    if (!texte) return;
    setTaches(prev => [...prev, { id: idUnique(), texte, parentId: null, termine: false }]);
  }; //si vide on fais rien sinon on ajoute un parent non terminé


  const ajouterSousObjectif = (parentId, texteBrut) => {
    const texte = (texteBrut || "").trim();
    if (!texte) return;
    setTaches(prev => {
      const next = prev
        .map(t => (t.id === parentId ? { ...t, termine: false } : t))
        .concat({ id: idUnique(), texte, parentId, termine: false });

      return next;
    });
  }; //ajoute un enfant et force le parent à false pour que les enfants soit fini d'abord

  const supprimer = idSup => {
    setTaches(prev => {
      const cible = prev.find(t => t.id === idSup);
      if (!cible) return prev;
      if (cible.parentId === null) return prev.filter(t => t.id !== idSup && t.parentId !== idSup);
      const reste = prev.filter(t => t.id !== idSup);
      const kids = reste.filter(t => t.parentId === cible.parentId);
      const parentTermine = kids.length ? kids.every(k => k.termine) : false;
      return reste.map(t => (t.id === cible.parentId ? { ...t, termine: parentTermine } : t));
    }); //on cherche lelement a supprimer si on a pas trouver on effectue aucun changement et si c'est un parent on supprime parent + enfant
  };  //si c'est un enfant on enleve lenfant et on recalcule si le parent est terminé 

  const modifier = (idModif, texteBrut) => {
    const texte = (texteBrut || "").trim();
    if (!texte) return;
    setTaches(prev => prev.map(t => (t.id === idModif ? { ...t, texte } : t)));
  }; //refuse les texte vide + remplace le texte uniquement pour la tahce concerner 

  const basculerTermine = idToggle => {
    setTaches(prev => {
      const tache = prev.find(t => t.id === idToggle);
      if (!tache) return prev;
      if (tache.parentId === null) {
        const kids = prev.filter(t => t.parentId === tache.id);
        if (kids.length) return prev; 
        return prev.map(t => (t.id === idToggle ? { ...t, termine: !t.termine } : t));
      } // si le parent a des enfant on bloque pour eviter qu'il coche le parent si il a des sous objeqctif
      const modifie = prev.map(t => (t.id === idToggle ? { ...t, termine: !t.termine } : t)); //on toggle lenfant
      const kids = modifie.filter(t => t.parentId === tache.parentId); //on recupere tout les enfant du mem e parent
      const parentTermine = kids.length ? kids.every(k => k.termine) : false; //si tout les enfant sont terminé le parent est accompli
      return modifie.map(t => (t.id === tache.parentId ? { ...t, termine: parentTermine } : t));//on met a jour le parent
    });
  }; 

  return {
    objectifsActifs,
    objectifsTermines,
    enfants,
    ajouterObjectif,
    ajouterSousObjectif,
    supprimer,
    modifier,
    basculerTermine,
  };
} //permet d'afficher les liste, les enfant d'un parent et declencher les actions user
