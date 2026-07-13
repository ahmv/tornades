export async function chargerJson(url, options = {}, valeurParDefaut = null) {
  try {
    const reponse = await fetch(url, options);

    if (!reponse.ok) {
      console.error(`Erreur HTTP ${reponse.status} pour ${url}`);
      return valeurParDefaut;
    }

    const typeContenu = reponse.headers.get('content-type') || '';

    if (!typeContenu.toLowerCase().includes('application/json')) {
      const apercu = await reponse.text();
      console.error(`Reponse non JSON pour ${url}:`, apercu.slice(0, 200));
      return valeurParDefaut;
    }

    return await reponse.json();
  } catch (erreur) {
    console.error(`Impossible de charger ${url}:`, erreur);
    return valeurParDefaut;
  }
}

export function normaliserListe(valeur) {
  if (Array.isArray(valeur)) {
    return valeur.filter(Boolean);
  }

  if (Array.isArray(valeur?.data)) {
    return valeur.data.filter(Boolean);
  }

  if (valeur && typeof valeur === 'object') {
    return Object.values(valeur).filter(Boolean);
  }

  return [];
}
