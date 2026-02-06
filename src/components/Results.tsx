import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, Clock, Calendar, Mail, Building, Users } from 'lucide-react'

interface TeamData {
  id: string
  timestamp: string
  date: string
  teamName: string
  teamLeader: string
  teamLeaderEmail: string
  collegeName: string
  domain: string
}

const mockData: TeamData[] = [
  {
    id: '1',
    timestamp: '09:04',
    date: '06/02/2026',
    teamName: 'Tech Innovators',
    teamLeader: 'Vaishnavi Akka',
    teamLeaderEmail: 'vaishnavi@vce.edu',
    collegeName: 'Vasavi College of Engineering',
    domain: 'AI/ML'
  },
  {
    id: '2',
    timestamp: '09:05',
    date: '06/02/2026',
    teamName: 'Code Warriors',
    teamLeader: 'Rahul Kumar',
    teamLeaderEmail: 'rahul@vce.edu',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Web Development'
  },
  {
    id: '3',
    timestamp: '09:06',
    date: '06/02/2026',
    teamName: 'Data Masters',
    teamLeader: 'Priya Sharma',
    teamLeaderEmail: 'priya@vce.edu',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Data Science'
  },
  {
    id: '4',
    timestamp: '09:07',
    date: '06/02/2026',
    teamName: 'Cloud Ninjas',
    teamLeader: 'Arjun Reddy',
    teamLeaderEmail: 'arjun@vce.edu',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cloud Computing'
  },
  {
    id: '5',
    timestamp: '09:08',
    date: '06/02/2026',
    teamName: 'Mobile Experts',
    teamLeader: 'Kavya Sri',
    teamLeaderEmail: 'kavya@vce.edu',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Mobile Development'
  }
]

const domains = ['All', 'AI/ML', 'Web Development', 'Data Science', 'Cloud Computing', 'Mobile Development', 'Blockchain', 'IoT']

export default function Results() {
  const [selectedDomain, setSelectedDomain] = useState('All')

  const filteredData = useMemo(() => {
    if (selectedDomain === 'All') {
      return mockData
    }
    return mockData.filter(team => team.domain === selectedDomain)
  }, [selectedDomain])

  return (
    <motion.div
      id="results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="results-section"
    >
      <div className="container">
        <h2 className="section-title">Results</h2>
        
        {/* Domain Filter */}
        <div className="filter-container">
          <div className="filter-header">
            <Filter size={20} />
            <h3>Filter by Domain</h3>
          </div>
          <div className="domain-filters">
            {domains.map(domain => (
              <button
                key={domain}
                className={`domain-btn ${selectedDomain === domain ? 'active' : ''}`}
                onClick={() => setSelectedDomain(domain)}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Results Table */}
        <div className="table-container">
          <div className="table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>
                    <div className="table-header">
                      <Clock size={16} />
                      <span>Time & Date</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-header">
                      <Users size={16} />
                      <span>Team Name</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-header">
                      <Users size={16} />
                      <span>Team Leader</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-header">
                      <Mail size={16} />
                      <span>Email</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-header">
                      <Building size={16} />
                      <span>College</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-header">
                      <Filter size={16} />
                      <span>Domain</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((team, index) => (
                  <motion.tr
                    key={team.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="table-row"
                  >
                    <td>
                      <div className="timestamp">
                        <Calendar size={14} />
                        <span>[{team.timestamp}, {team.date}]</span>
                      </div>
                    </td>
                    <td className="team-name">{team.teamName}</td>
                    <td className="team-leader">{team.teamLeader}</td>
                    <td className="email">
                      <a href={`mailto:${team.teamLeaderEmail}`} className="email-link">
                        {team.teamLeaderEmail}
                      </a>
                    </td>
                    <td className="college">{team.collegeName}</td>
                    <td>
                      <span className="domain-badge">{team.domain}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="no-results">
              <p>No teams found for the selected domain.</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="stats-container">
          <div className="stat-card">
            <h4>Total Teams</h4>
            <span className="stat-number">{filteredData.length}</span>
          </div>
          <div className="stat-card">
            <h4>Domains</h4>
            <span className="stat-number">{selectedDomain === 'All' ? domains.length - 1 : 1}</span>
          </div>
          <div className="stat-card">
            <h4>Colleges</h4>
            <span className="stat-number">{new Set(filteredData.map(t => t.collegeName)).size}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
