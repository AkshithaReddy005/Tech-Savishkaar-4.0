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
  // Agritech Results
  {
    id: '1',
    teamName: 'Synergy',
    teamLeader: 'Madhavi',
    teamLeaderEmail: 'madhavi.2405054@srec.ac.in',
    collegeName: 'Sri Ramakrishna Engineering College',
    domain: 'Agritech'
  },
  {
    id: '2',
    teamName: 'Hydrofusion',
    teamLeader: 'Laasya M',
    teamLeaderEmail: 'm.laasya07@gmail.com',
    collegeName: 'Vasavi college of Engineering',
    domain: 'Agritech'
  },
  {
    id: '3',
    teamName: 'Code 4 Cause',
    teamLeader: 'Veeragandham Shreya',
    teamLeaderEmail: 'sveeragandham@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Agritech'
  },
  {
    id: '4',
    teamName: 'Null Pointers',
    teamLeader: 'Anshul Singh',
    teamLeaderEmail: 'bt24cs034@nitmz.ac.in',
    collegeName: 'National Institute Of Technology, Mizoram',
    domain: 'Agritech'
  },
  {
    id: '5',
    teamName: 'gnagalahari2005',
    teamLeader: 'G.Naga Lahari',
    teamLeaderEmail: 'gnagalahari2005@gmail.com',
    collegeName: 'G.Pulla Reddy Engineering College',
    domain: 'Agritech'
  },
  {
    id: '6',
    teamName: 'Spirit CH',
    teamLeader: 'Ajith Reddy',
    teamLeaderEmail: 'ajithreddychittireddy@gmail.com',
    collegeName: 'Vardhaman College Of Engineering',
    domain: 'Agritech'
  },
  {
    id: '7',
    teamName: 'agro_ally',
    teamLeader: 'hari kaushik',
    teamLeaderEmail: 'harikaushik2005@gmail.com',
    collegeName: 'vasavi college of engineering',
    domain: 'Agritech'
  },
  {
    id: '8',
    teamName: 'Phoenix',
    teamLeader: 'Pavan kumar k',
    teamLeaderEmail: 'pavankumar2005712@gmail.com',
    collegeName: 'VNRVJIET',
    domain: 'Agritech'
  },
  {
    id: '9',
    teamName: 'Tech Titans',
    teamLeader: 'Harsha Vardhan',
    teamLeaderEmail: 'harshavardhanvotte@gmail.com',
    collegeName: 'MVSR Engineering College',
    domain: 'Agritech'
  },
  {
    id: '10',
    teamName: 'Team_Hack',
    teamLeader: 'Patan Sharukhan',
    teamLeaderEmail: 'sharukhan2005786@gmail.com',
    collegeName: 'G Pulla Reddy Engineering College',
    domain: 'Agritech'
  },
  {
    id: '11',
    teamName: 'TRIAD',
    teamLeader: 'Vaishnav Tadakamadla',
    teamLeaderEmail: 'vaishnavtadakamadla5453@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Agritech'
  },
  {
    id: '12',
    teamName: 'Synervate',
    teamLeader: 'Kolluru Kameswara Suryesh',
    teamLeaderEmail: 'suryakolluru22@gmail.com',
    collegeName: 'Amrita vishwa vidyapeetham, chennai',
    domain: 'Agritech'
  },
  {
    id: '13',
    teamName: 'Vajppp',
    teamLeader: 'Jay Shreeram Yeraballi',
    teamLeaderEmail: '8jayram4@gmail.com',
    collegeName: 'University College Of Engineering, Osmania University',
    domain: 'Agritech'
  },
  {
    id: '14',
    teamName: 'TrailBlazers',
    teamLeader: 'Vikaas Nalajala',
    teamLeaderEmail: 'vikaasnalajala@gmail.com',
    collegeName: 'CBIT',
    domain: 'Agritech'
  },
  {
    id: '15',
    teamName: 'harisampathbellam',
    teamLeader: 'Bellam Hari Sampath',
    teamLeaderEmail: 'harisampathbellam@gmail.com',
    collegeName: 'Mahindra University',
    domain: 'Agritech'
  },
  {
    id: '16',
    teamName: 'Null Pointers',
    teamLeader: 'Anshul Singh',
    teamLeaderEmail: 'bt24cs034@nitmz.ac.in',
    collegeName: 'National Institute Of Technology, Mizoram',
    domain: 'Agritech'
  },
  {
    id: '17',
    teamName: 'navacharithasriramadasu',
    teamLeader: 'Navacharitha Sriramadasu',
    teamLeaderEmail: 'navacharithasriramadasu@gmail.com',
    collegeName: 'MVSR Engineering College',
    domain: 'Agritech'
  },
  {
    id: '18',
    teamName: 'Snippets',
    teamLeader: 'Chethireddy Srikaran Reddy',
    teamLeaderEmail: 'mail2srikaran@gmail.com',
    collegeName: 'VNRVJIET',
    domain: 'Agritech'
  },
  {
    id: '19',
    teamName: 'Vortex 3',
    teamLeader: 'Chinmanolla Gayathri',
    teamLeaderEmail: 'gayathrichinmanolla@gmail.com',
    collegeName: 'NEIL GOGTE INSTITUTE OF TECHNOLOGY',
    domain: 'Agritech'
  },
  {
    id: '20',
    teamName: 'Vijayen',
    teamLeader: 'Hemanth balaji',
    teamLeaderEmail: 'hemanthbalaji021@gmail.com',
    collegeName: 'vasavi college of engineering',
    domain: 'Agritech'
  },
  {
    id: '21',
    teamName: 'TechHarvesters',
    teamLeader: 'KENCHE SRIKAR',
    teamLeaderEmail: '24211a7257@bvrit.ac.in',
    collegeName: 'Bv raju institute of technology',
    domain: 'Agritech'
  },

  // Cybersecurity Results
  {
    id: '22',
    teamName: 'MUGEN',
    teamLeader: 'Amrabad Jaideep',
    teamLeaderEmail: 'amarabadjayadeep@gmail.com',
    collegeName: 'Nalla Narasimha Reddy Education Society\'s Group of Institutions',
    domain: 'Cybersecurity'
  },
  {
    id: '23',
    teamName: 'NeuralShield',
    teamLeader: 'Swathi Chippa',
    teamLeaderEmail: 'chippaswathi8@gmail.com',
    collegeName: 'Chaitanya Bharathi Institute of Technology, Hyderabad',
    domain: 'Cybersecurity'
  },
  {
    id: '24',
    teamName: 'Varanasi',
    teamLeader: 'ADONI INDIRA',
    teamLeaderEmail: '239X1A3301@gprec.ac.in',
    collegeName: 'G. Pulla Reddy Engineering College (Autonomous)',
    domain: 'Cybersecurity'
  },
  {
    id: '25',
    teamName: 'Tech Squad',
    teamLeader: 'Nangunuri Rishwitha',
    teamLeaderEmail: 'nangunuririshwitha@gmail.com',
    collegeName: 'Gokaraju Rangaraju Institute of Engineering & Technology',
    domain: 'Cybersecurity'
  },
  {
    id: '26',
    teamName: 'Hackaholics',
    teamLeader: 'Thallapalli Suhaas Rao',
    teamLeaderEmail: 'suhaasrao28@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '27',
    teamName: 'Nova',
    teamLeader: 'NITISH J M',
    teamLeaderEmail: 'nitishinwork@gmail.com',
    collegeName: 'SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY',
    domain: 'Cybersecurity'
  },
  {
    id: '28',
    teamName: 'VOIDFORGE',
    teamLeader: 'Vishwaruban S',
    teamLeaderEmail: 'vishwarubanofficial@gmail.com',
    collegeName: 'Sri Krishna College of Engineering and Technology',
    domain: 'Cybersecurity'
  },
  {
    id: '29',
    teamName: 'Jake_Peralta',
    teamLeader: 'Vasist K',
    teamLeaderEmail: 'workvasist@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '30',
    teamName: 'Engineers',
    teamLeader: 'Shirisha',
    teamLeaderEmail: 'mangenapallyshirisha123@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '31',
    teamName: 'Chilukuruvarshini1405',
    teamLeader: 'Varshini chilukuru',
    teamLeaderEmail: 'Chilukuruvarshini1405@gmail.com',
    collegeName: 'Vasavi college of engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '32',
    teamName: 'Care Reach',
    teamLeader: 'Deepika Penta',
    teamLeaderEmail: 'deepikapenta@yahoo.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '33',
    teamName: 'Code blooded',
    teamLeader: 'Pendyala Uday Kumar',
    teamLeaderEmail: 'udaykumarpendyalalikki@gmail.com',
    collegeName: 'Vasavi college of engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '34',
    teamName: 'STROM BRAKERS',
    teamLeader: 'ANIL KUMAR B.V',
    teamLeaderEmail: 'ch.anilkumar984@gmail.com',
    collegeName: 'Raju Institute of Technology',
    domain: 'Cybersecurity'
  },
  {
    id: '35',
    teamName: 'Crew Four',
    teamLeader: 'Helona Aruri',
    teamLeaderEmail: 'helona0211@gmail.com',
    collegeName: 'Keshav Memorial Engineering College',
    domain: 'Cybersecurity'
  },
  {
    id: '36',
    teamName: 'sriaakarshnekkanti',
    teamLeader: 'Sri Aakarsh Nekkanti',
    teamLeaderEmail: 'sriaakarshnekkanti@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '37',
    teamName: 'SkunkWorks',
    teamLeader: 'Vikranth Tumma',
    teamLeaderEmail: 'vikrantht32@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '38',
    teamName: 'code maxing',
    teamLeader: 'Mohammed Shahzaman',
    teamLeaderEmail: '23h51a04n3@cmrcet.ac.in',
    collegeName: 'CMRCET',
    domain: 'Cybersecurity'
  },
  {
    id: '39',
    teamName: 'ATHENS',
    teamLeader: 'Bhavesh Dharewa',
    teamLeaderEmail: 'bhaveshd7701@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '40',
    teamName: 'Nexora',
    teamLeader: 'Gourishetti Jayaram',
    teamLeaderEmail: 'gourishettijayaram123@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '41',
    teamName: 'Cybersentinels',
    teamLeader: 'Rakesh Manthri',
    teamLeaderEmail: 'manthrirs06@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity'
  },
  {
    id: '42',
    teamName: 'Alpha Duo',
    teamLeader: 'AKSHITHA REDDY',
    teamLeaderEmail: 'akshithareddy2405@gmail.com',
    collegeName: 'VASAVI COLLEGE OF ENGINEERING',
    domain: 'Cybersecurity'
  },

  // HealthTech Results
  {
    id: '43',
    teamName: 'Vyoma',
    teamLeader: 'Anuja Kuchipudi',
    teamLeaderEmail: 'kuchipudianuja3@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech'
  },
  {
    id: '44',
    teamName: 'Moon Knight (old team name: 24215A3206)',
    teamLeader: 'Sanda Vinay',
    teamLeaderEmail: '24215a3206@bvrit.ac.in',
    collegeName: 'BVRIT Narsapur',
    domain: 'HealthTech'
  },
  {
    id: '45',
    teamName: 'RUN TIME TERRORS',
    teamLeader: 'Kumarkalava Mohammed Sowban',
    teamLeaderEmail: '249xa33106@gprec.ac.in',
    collegeName: 'G.Pulla Reddy Engineering College',
    domain: 'HealthTech'
  },
  {
    id: '46',
    teamName: 'Equilibria',
    teamLeader: 'A S Sreeram Varun Sharma',
    teamLeaderEmail: 'varunsreeram29@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'HealthTech'
  },
  {
    id: '47',
    teamName: 'Team binary',
    teamLeader: 'Saatvik Cheruku',
    teamLeaderEmail: 'saatvikcheruku@gmail.com',
    collegeName: 'Lovely Professional University, Punjab',
    domain: 'HealthTech'
  },
  {
    id: '48',
    teamName: 'House Targaryen',
    teamLeader: 'P.Pardiv Sai Charan',
    teamLeaderEmail: 'pardeevpatti08@gmail.com',
    collegeName: 'Vasavi College of Engineering,Hyderabad',
    domain: 'HealthTech'
  },
  {
    id: '49',
    teamName: 'Tech phantoms',
    teamLeader: 'Pulumamidi Vinay Kumar',
    teamLeaderEmail: '239x1a33a6@gprec.ac.in',
    collegeName: 'G. Pulla Reddy Engineering College',
    domain: 'HealthTech'
  },
  {
    id: '50',
    teamName: 'Sriram Girish Chandran',
    teamLeader: 'Sriram Girish Chandran',
    teamLeaderEmail: 'sriramgirishc@gmail.com',
    collegeName: 'Sri Krishna College of Engineering and Technology - SKCET',
    domain: 'HealthTech'
  },
  {
    id: '51',
    teamName: 'The Debuggers',
    teamLeader: 'Mohammad Afrid Pasha',
    teamLeaderEmail: 'afridpasha1983@gmail.com',
    collegeName: 'Vasavi College of Engineering, Hyderabad',
    domain: 'HealthTech'
  },
  {
    id: '52',
    teamName: 'TechTeaMakers',
    teamLeader: 'Sri Vaishnavi',
    teamLeaderEmail: 'bondugulasrivaishnavi@gmail.com',
    collegeName: 'VNR VJIET',
    domain: 'HealthTech'
  },
  {
    id: '53',
    teamName: 'RedBull Coding',
    teamLeader: 'Sirna Sai Vishnu',
    teamLeaderEmail: 'sirna.vishnu05@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'HealthTech'
  },
  {
    id: '54',
    teamName: 'POKURI SRIRAM',
    teamLeader: 'POKURI SRIRAM',
    teamLeaderEmail: 'pokurisriram55@gmail.com',
    collegeName: 'G Pulla Reddy Engineering College',
    domain: 'HealthTech'
  },
  {
    id: '55',
    teamName: '$a✓ishk@²r',
    teamLeader: 'Thirukovela Moulya',
    teamLeaderEmail: 'tmoulya2707@gmail.com',
    collegeName: 'Chaitanya Bharathi Institute Of Technology',
    domain: 'HealthTech'
  },
  {
    id: '56',
    teamName: 'm.saisushanth21',
    teamLeader: 'SAI SUSHANTH MOTURI',
    teamLeaderEmail: 'm.saisushanth21@gmail.com',
    collegeName: 'CBIT',
    domain: 'HealthTech'
  },
  {
    id: '57',
    teamName: 'MOOD VITALS',
    teamLeader: 'Kaipa Chaturya Reddy',
    teamLeaderEmail: 'kaipachaturyareddy7275@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech'
  },
  {
    id: '58',
    teamName: 'Tech Champions',
    teamLeader: 'SADIYA MAHEEN SIDDIQUI',
    teamLeaderEmail: 'adibasadiya9502@gmail.com',
    collegeName: 'University College of Engineering - Osmania University',
    domain: 'HealthTech'
  },
  {
    id: '59',
    teamName: 'Abcd',
    teamLeader: 'Panjugula Nitin Kumar Goud',
    teamLeaderEmail: 'nithinkumargoud1234@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech'
  },
  {
    id: '60',
    teamName: 'The TEAM',
    teamLeader: 'K.SaiRevanth',
    teamLeaderEmail: 'sairevanth040@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech'
  },
  {
    id: '61',
    teamName: 'Bridge things',
    teamLeader: 'Vaibhav Shahi',
    teamLeaderEmail: 'theshahivaibhav@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech'
  },
  {
    id: '62',
    teamName: 'Krusyatri',
    teamLeader: 'Laasya CR',
    teamLeaderEmail: 'mlaasy16@gmail.com',
    collegeName: 'RAO AIMSCS',
    domain: 'HealthTech'
  },
  {
    id: '63',
    teamName: 'Team Y',
    teamLeader: 'Malluri Vikas',
    teamLeaderEmail: 'vikasmalluri@gmail.com',
    collegeName: 'Mahatma Gandhi Institute of Technology',
    domain: 'HealthTech'
  },

  // Remote Sensing, Environment & Sustainable Development Results
  {
    id: '64',
    teamName: 'WE',
    teamLeader: 'Rathod Rupali',
    teamLeaderEmail: 'rupalirathod026@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '65',
    teamName: 'Sentinelx',
    teamLeader: 'Hrithik Tadepalli',
    teamLeaderEmail: 'tadepallihrithik@gmail.com',
    collegeName: 'Vasavi college of engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '66',
    teamName: 'UrbanSentinels',
    teamLeader: 'Nazia',
    teamLeaderEmail: 'mdnazia1467@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '67',
    teamName: 'Rural Development',
    teamLeader: 'Gardas Akash',
    teamLeaderEmail: 'akash39g@gmail.com',
    collegeName: 'CVR College of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '68',
    teamName: 'OPS',
    teamLeader: 'Chakshu Varma Akkala',
    teamLeaderEmail: 'chakshu.akkala@gmail.com',
    collegeName: 'Vasavi College of Engineeering',
    domain: 'Remote Sensing'
  },
  {
    id: '69',
    teamName: 'charan and team',
    teamLeader: 'K Sri Charan Goud',
    teamLeaderEmail: 'katamonisricharan@gmail.com',
    collegeName: 'University College of Engineering, Osmania University (UCEOU)',
    domain: 'Remote Sensing'
  },
  {
    id: '70',
    teamName: 'Team Sharanga',
    teamLeader: 'Gummadi Karuna Sree',
    teamLeaderEmail: 'karunasreegummadi04@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '71',
    teamName: 'Code Crusaders',
    teamLeader: 'M Bhuvana',
    teamLeaderEmail: 'miriyalabhuvana14@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '72',
    teamName: '921132dhanasrisoli',
    teamLeader: 'Dhana Sri Soli',
    teamLeaderEmail: '921132dhanasrisoli@gmail.com',
    collegeName: 'Chaitanya Bharathi Institute of Technology',
    domain: 'Remote Sensing'
  },
  {
    id: '73',
    teamName: 'Kanaparthi Mohan Reddy',
    teamLeader: 'Kanaparthi Mohan Reddy',
    teamLeaderEmail: '239x1a3247@gprec.ac.in',
    collegeName: 'G Pulla Reddy Engineering College',
    domain: 'Remote Sensing'
  },
  {
    id: '74',
    teamName: 'KeyNova',
    teamLeader: 'Lathika',
    teamLeaderEmail: 'lathikasasimanikandan@gmail.com',
    collegeName: 'Karpagam College of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '75',
    teamName: 'NoCode Devs',
    teamLeader: 'J.Akhil',
    teamLeaderEmail: 'akhil.j12314@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '76',
    teamName: 'Vasuki',
    teamLeader: 'M Srikar Rao',
    teamLeaderEmail: 'mahendarkarsrikarrao@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '77',
    teamName: 'Continuum',
    teamLeader: 'Jasmitha V',
    teamLeaderEmail: 'v.jasmitha143@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '78',
    teamName: 'Runtime Rebel\'s',
    teamLeader: 'Tupakula Siva Shankar',
    teamLeaderEmail: 'tupakulashiva13@gmail.com',
    collegeName: 'vasavi college of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '79',
    teamName: 'Runtime Terror',
    teamLeader: 'Jakkampudi Gowtam Sai',
    teamLeaderEmail: 'gowtamsai911@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '80',
    teamName: 'Geo Vision',
    teamLeader: 'Gantyala Naveen',
    teamLeaderEmail: 'gantyalanaveen1234@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing'
  },
  {
    id: '81',
    teamName: 'Crusaders',
    teamLeader: 'Shivani',
    teamLeaderEmail: 'eshivani07@gmail.com',
    collegeName: 'Vasavi College of Enginnerng',
    domain: 'Remote Sensing'
  },
  {
    id: '82',
    teamName: 'Hackstreet',
    teamLeader: 'keerthana b',
    teamLeaderEmail: 'bkeerthana2211@gmail.com',
    collegeName: 'Vasavi College of Enginnerng',
    domain: 'Remote Sensing'
  },
  {
    id: '83',
    teamName: 'Debugging therapists',
    teamLeader: 'Sriram S',
    teamLeaderEmail: 'sriramvinu2007@gmail.com',
    collegeName: 'Sri Krishna college of engineering and technology',
    domain: 'Remote Sensing'
  },
  {
    id: '84',
    teamName: 'Sakha',
    teamLeader: 'Gudipally Nishanth reddy',
    teamLeaderEmail: 'gnishanthreddy0513@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing'
  }
]

const domains = ['All', 'Agritech', 'Cybersecurity', 'HealthTech', 'Remote Sensing']

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
            <a href="https://techsavishkar.com" className="nav-btn">
              <Home size={20} />
              <span>Home</span>
            </a>
            <h1 className="page-title">Tech Savishkaar 4.0 - First Round Results</h1>
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
          </div>
        </div>
      </motion.div>
    </div>
  )
}
