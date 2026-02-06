import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, Mail, Building, Users, Home, Search } from 'lucide-react'

interface TeamData {
  id: string
  teamName: string
  teamLeader: string
  teamLeaderEmail: string
  collegeName: string
  domain: string
}

const mockData: TeamData[] = [
  {
    id: '1',
    teamName: 'Tech Innovators',
    teamLeader: 'Vaishnavi ',
    teamLeaderEmail: 'vaishnavi@vce.edu',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Agritech'
  },
  {
    id: '2',
    teamName: 'Earth Watchers',
    teamLeader: 'Akshitha Reddy',
    teamLeaderEmail: 'rahul@vce.edu',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '3',
    teamName: 'MediCare Plus',
    teamLeader: 'Priya Sharma',
    teamLeaderEmail: 'priya@vce.edu',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech'
  },
  {
    id: '4',
    teamName: 'Secure Shield',
    teamLeader: 'Arjun Reddy',
    teamLeaderEmail: 'arjun@vce.edu',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cyber Security'
  },
  {
    id: '5',
    teamName: 'Farm Future',
    teamLeader: 'Kavya Sri',
    teamLeaderEmail: 'kavya@vce.edu',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Agritech'
  }
]

const domains = ['All', 'Agritech', 'Remote Sensing', 'HealthTech', 'Cyber Security']

export default function ResultsPage() {
  const [selectedDomain, setSelectedDomain] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    let filtered = mockData
    
    // Filter by domain
    if (selectedDomain !== 'All') {
      filtered = filtered.filter(team => team.domain === selectedDomain)
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(team => 
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.teamLeader.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return filtered
  }, [selectedDomain, searchTerm])

  return (
    <div className="results-page">
      {/* Navigation Header */}
      <header className="page-header">
        <div className="container">
          <div className="title-nav-container">
            <a href="http://localhost:5173" className="nav-btn">
              <Home size={20} />
              <span>Home</span>
            </a>
            <h1 className="page-title">Competition Results</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="results-section"
      >
        <div className="container">
          {/* Search Input */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by team name, leader, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
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
    </div>
  )
}
