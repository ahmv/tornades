export const teamComparator = (a, b) => {
  const orderSuffix = ['-1', '-2', 'A', 'B', 'C', '-BB'];

  const normalize = (name) => name ? name.trim().toUpperCase() : '';

  const classify = (team) => {
    const name = normalize(team.Nom || team);
    if (name === 'GARDIENS') return { group: 1 };
    if (name === 'ENTRAINEURS' || name === 'ENTRAÎNEURS') return { group: 2 };
    const match = name.match(/^M(\d+)(.*)$/);
    if (match) {
      const level = parseInt(match[1], 10);
      const suffix = match[2].replace(/\s+/g, '');
      const rank = orderSuffix.indexOf(suffix);
      return {
        group: 0,
        level,
        rank: rank === -1 ? orderSuffix.length : rank,
        name,
      };
    }
    return { group: 3, name };
  };

  const infoA = classify(a);
  const infoB = classify(b);

  if (infoA.group !== infoB.group) return infoA.group - infoB.group;
  if (infoA.group === 0) {
    if (infoA.level !== infoB.level) return infoA.level - infoB.level;
    if (infoA.rank !== infoB.rank) return infoA.rank - infoB.rank;
  }
  const nameA = a.Nom || a;
  const nameB = b.Nom || b;
  return nameA.localeCompare(nameB);
};

export const sortTeams = (teams) => teams.sort(teamComparator);
