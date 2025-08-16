import React from "react";
import { FaTrophy, FaHome, FaCrown } from "react-icons/fa";

const Leaderboard = ({ leaderboard, goHome }) => {
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <FaTrophy size={32} style={styles.trophyIcon} />
        <h1 style={styles.title}>Classement</h1>
      </div>

      <div style={styles.tableContainer}>
        {sortedLeaderboard.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>Aucun score enregistré</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Position</th>
                <th style={styles.tableHeader}>Nom</th>
                <th style={styles.tableHeader}>Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.map((entry, idx) => (
                <tr 
                  key={idx} 
                  style={{
                    ...styles.tableRow,
                    ...(idx === 0 ? styles.firstPlace : {}),
                    ...(idx === 1 ? styles.secondPlace : {}),
                    ...(idx === 2 ? styles.thirdPlace : {})
                  }}
                >
                  <td style={styles.positionCell}>
                    {idx + 1}
                    {idx < 3 && (
                      <FaCrown 
                        size={16} 
                        style={{
                          ...styles.crownIcon,
                          color: idx === 0 ? '#FFD700' : 
                                 idx === 1 ? '#C0C0C0' : 
                                 '#CD7F32'
                        }} 
                      />
                    )}
                  </td>
                  <td style={styles.nameCell}>{entry.name}</td>
                  <td style={styles.scoreCell}>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button 
        onClick={goHome} 
        style={styles.homeButton}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#388E3C'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
      >
        <FaHome style={styles.homeIcon} />
        Retour à l'accueil
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    position: 'relative'
  },
  trophyIcon: {
    color: '#FFD700'
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    margin: 0
  },
  tableContainer: {
    margin: '2rem 0',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0
  },
  tableHeaderRow: {
    backgroundColor: '#4CAF50',
    color: 'white'
  },
  tableHeader: {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '1rem'
  },
  tableRow: {
    backgroundColor: '#fff',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  firstPlace: {
    backgroundColor: '#FFF8E1',
    borderLeft: '4px solid #FFD700'
  },
  secondPlace: {
    backgroundColor: '#F5F5F5',
    borderLeft: '4px solid #C0C0C0'
  },
  thirdPlace: {
    backgroundColor: '#FFF3E0',
    borderLeft: '4px solid #CD7F32'
  },
  positionCell: {
    padding: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  nameCell: {
    padding: '1rem',
    color: '#333'
  },
  scoreCell: {
    padding: '1rem',
    fontWeight: '600',
    color: '#4CAF50'
  },
  crownIcon: {
    marginLeft: '4px'
  },
  emptyState: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px'
  },
  emptyText: {
    color: '#666',
    fontSize: '1.1rem',
    margin: 0
  },
  homeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    marginTop: '2rem',
    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
  },
  homeIcon: {
    fontSize: '1rem'
  }
};

export default Leaderboard;