import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const joursSemaine = [
  "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
];

const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [pratiques, setPratiques] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `
          query {
            pratiques(pagination: { pageSize: 100 }, sort: "Jour:desc") {
              documentId
              Debut
              Fin
              Jour
              arena {
                documentId
                Nom
              }
              equipes {
                documentId
                Nom
              }
            }
          }
        `;

        const response = await fetch("/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query })
        });

        const json = await response.json();

        if (json.errors) {
          console.error(json.errors);
          setError("Erreur lors du chargement des données");
        } else {
          setPratiques(json.data.pratiques || []);
        }
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { loading, pratiques, error };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
    overflowX: "auto",
    backgroundColor: theme.palette.background.paper
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: "1rem"
  },
  table: {
    minWidth: 650
  }
}));

function Pratiques() {
  const classes = useStyles();
  const { loading, pratiques, error } = useFetch();
  const selectRef = useRef(0);
  const [selEquipe, setSelEquipe] = useState(0);
  const [inclusAncien, setInclusAncien] = useState(false);

  const optionsDate = { hour12: false };

  const maintenant = new Date();
  const aujourdhui = new Date(
    maintenant.getFullYear(),
    maintenant.getMonth(),
    maintenant.getDate()
  );

  // Extraire toutes les équipes uniques
  const equipes = Array.from(
    new Map(
      pratiques
        .flatMap((p) => p.equipes || [])
        .map((eq) => [eq.documentId, eq])
    ).values()
  );

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h2">Pratiques</Typography>
        <span>Choisir votre équipe:</span>
        <select
          ref={selectRef}
          onChange={() => setSelEquipe(selectRef.current.value)}
        >
          <option key={0} value={0}>Toutes</option>
          {equipes.map((equipe) => (
            <option key={equipe.documentId} value={equipe.documentId}>
              {equipe.Nom}
            </option>
          ))}
        </select>
        <br />
        <label>
          <input
            type="checkbox"
            defaultChecked={false}
            onClick={() => setInclusAncien(!inclusAncien)}
          />{" "}
          Afficher les anciennes pratiques
        </label>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right">Jour</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Équipes</TableCell>
              <TableCell align="right">Début</TableCell>
              <TableCell align="right">Fin</TableCell>
              <TableCell align="right">Aréna</TableCell>
            </TableRow>
          </TableHead>
<TableBody>
  {pratiques
    .filter((pratique) => {
      const matchEquipe =
        selEquipe === "0" || selEquipe === 0 ||
        (pratique.equipes || []).some(
          (eq) => eq.documentId === selEquipe
        );

      const now = new Date();
      const pratiqueFin = new Date(`${pratique.Jour}T${pratique.Fin || "00:00"}`);
      const matchDate = inclusAncien || pratiqueFin >= now;

      return matchEquipe && matchDate;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.Jour}T${a.Debut || "00:00"}`);
      const dateB = new Date(`${b.Jour}T${b.Debut || "00:00"}`);
      return dateA - dateB;
    })
    .map((pratique) => (
      <TableRow key={pratique.documentId}>
        <TableCell align="right">
          {joursSemaine[new Date(pratique.Jour).getDay()]}
        </TableCell>
        <TableCell align="right">
          {new Date(pratique.Jour).toLocaleDateString(
            "fr-CA",
            optionsDate
          )}
        </TableCell>
        <TableCell align="right">
          {(pratique.equipes || []).map((eq) => (
            <span key={eq.documentId}>
              {eq.Nom}
              <br />
            </span>
          ))}
        </TableCell>
        <TableCell align="right">
          {pratique.Debut?.slice(0, 5)}
        </TableCell>
        <TableCell align="right">
          {pratique.Fin?.slice(0, 5)}
        </TableCell>
        <TableCell align="right">
          {pratique.arena ? pratique.arena.Nom : "---"}
        </TableCell>
      </TableRow>
    ))}
</TableBody>

        </Table>
      </Paper>
    </Container>
  );
}

export default Pratiques;
