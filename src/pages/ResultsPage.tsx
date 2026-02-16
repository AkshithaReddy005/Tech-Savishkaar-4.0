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
  round: string
  cityState: string
  isWaitingList?: boolean
}

const mockData: TeamData[] = [
  // Round 2 Finalists Results
  // Agritech Finalists
  {
    id: 'r2-1',
    teamName: 'navacharithasriramadasu',
    teamLeader: 'Navacharitha Sriramadasu',
    teamLeaderEmail: 'navacharithasriramadasu@gmail.com',
    collegeName: 'Mvsr engineering college',
    domain: 'Agritech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  {
    id: 'r2-2',
    teamName: 'Spirit CH',
    teamLeader: 'Ajith Reddy',
    teamLeaderEmail: 'ajithreddychittireddy@gmail.com',
    collegeName: 'Vardhaman College of Engineering',
    domain: 'Agritech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  {
    id: 'r2-3',
    teamName: 'Vortex 3',
    teamLeader: 'Chinmanolla Gayathri',
    teamLeaderEmail: 'gayathrichinmanolla@gmail.com',
    collegeName: 'NEIL GOGTE INSTITUTE OF TECHNOLOGY',
    domain: 'Agritech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  {
    id: 'r2-4',
    teamName: 'CodeBlooded',
    teamLeader: 'B.Hari Sampath',
    teamLeaderEmail: 'harisampathbellam@gmail.com',
    collegeName: 'Mahindra University',
    domain: 'Agritech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  {
    id: 'r2-5',
    teamName: 'Synervate',
    teamLeader: 'Kolluru Kameswara Suryesh',
    teamLeaderEmail: 'suryakolluru22@gmail.com',
    collegeName: 'Amrita Vishwa vidyaapeetham, Chennai',
    domain: 'Agritech',
    round: 'Round 2 Finalists',
    cityState: 'Chennai, Tamilnadu',
    isWaitingList: false
  },
  // Agritech Waiting List
  {
    id: 'r2-6',
    teamName: 'Phoenix',
    teamLeader: 'Pavan Kumar K',
    teamLeaderEmail: 'pavankumar200571@gmail.com',
    collegeName: 'VNRVJIET',
    domain: 'Agritech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: true
  },
  {
    id: 'r2-7',
    teamName: 'TechHarvesters',
    teamLeader: 'Kenche Srikar',
    teamLeaderEmail: '24211a7257@bvrit.ac.in',
    collegeName: 'BVRIT',
    domain: 'Agritech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: true
  },

  // Remote Sensing Finalists
  {
    id: 'r2-8',
    teamName: 'Team KanyaRashi',
    teamLeader: 'Kanaparthi Mohan Reddy',
    teamLeaderEmail: '239x1a3247@gprec.ac.in',
    collegeName: 'G Pulla Reddy Engineering College, Kurnool',
    domain: 'Remote Sensing',
    round: 'Round 2 Finalists',
    cityState: 'Kurnool, Andhra Pradesh',
    isWaitingList: false
  },
  {
    id: 'r2-9',
    teamName: 'Runtime Terror',
    teamLeader: 'Jakkampudi Gowtam Sai',
    teamLeaderEmail: 'gowtamsai911@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  {
    id: 'r2-10',
    teamName: 'Continuum',
    teamLeader: 'Jasmitha Veeramachaneni',
    teamLeaderEmail: 'v.jasmitha143@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  {
    id: 'r2-11',
    teamName: 'Vasuki',
    teamLeader: 'M Srikar Rao',
    teamLeaderEmail: 'mahendarkarsrikarrao@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  {
    id: 'r2-12',
    teamName: '921132dhanasrisoli',
    teamLeader: 'Dhana Sri Soli',
    teamLeaderEmail: '921132dhanasrisoli@gmail.com',
    collegeName: 'Chaitanya Bharathi Institute of Technology',
    domain: 'Remote Sensing',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  // Remote Sensing Waiting List
  {
    id: 'r2-13',
    teamName: 'OPS',
    teamLeader: 'Chakshu Varma',
    teamLeaderEmail: 'chakshu.akkala@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: true
  },
  {
    id: 'r2-14',
    teamName: 'KeyNova',
    teamLeader: 'Lathika',
    teamLeaderEmail: 'lathikasasimanikandan@gmail.com',
    collegeName: 'Karpagam college of engineering',
    domain: 'Remote Sensing',
    round: 'Round 2 Finalists',
    cityState: 'Coimbatore, Tamil Nadu',
    isWaitingList: true
  },

  // HealthTech Finalists
  {
    id: 'r2-15',
    teamName: '$a✓ishk@²r',
    teamLeader: 'Thirukovela Moulya',
    teamLeaderEmail: 'tmoulya2707@gmail.com',
    collegeName: 'Chaitanya Bharathi Institute of Technology',
    domain: 'HealthTech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  {
    id: 'r2-16',
    teamName: 'Tech phantoms',
    teamLeader: 'Pulumamidi Vinay Kumar',
    teamLeaderEmail: '239x1a33a6@gprec.ac.in',
    collegeName: 'G. Pulla Reddy Engineering College',
    domain: 'HealthTech',
    round: 'Round 2 Finalists',
    cityState: 'Kurnool, Andhra Pradesh',
    isWaitingList: false
  },
  {
    id: 'r2-17',
    teamName: 'MOOD VITALS',
    teamLeader: 'Kaipa Chaturya Reddy',
    teamLeaderEmail: 'kaipachaturyareddy7275@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  {
    id: 'r2-18',
    teamName: 'MOON KNIGHT',
    teamLeader: 'Vinay Sanda',
    teamLeaderEmail: '24215a3206@bvrit.ac.in',
    collegeName: 'BVRIT NARSAPUR',
    domain: 'HealthTech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  {
    id: 'r2-19',
    teamName: 'Abcd',
    teamLeader: 'Panjugula Nitin Kumar Goud',
    teamLeaderEmail: 'nithinkumargoud1234@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: false
  },
  // HealthTech Waiting List
  {
    id: 'r2-20',
    teamName: 'Redbull Coding',
    teamLeader: 'Sirna Sai Vishnu',
    teamLeaderEmail: 'sirna.vishnu05@gmail.com',
    collegeName: 'Vasavi college of engineering',
    domain: 'HealthTech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: true
  },
  {
    id: 'r2-21',
    teamName: 'Equilibria',
    teamLeader: 'A S Sreeram Varun Sharma',
    teamLeaderEmail: 'varunsreeram29@gmail.com',
    collegeName: 'Vasavi college of engineering',
    domain: 'HealthTech',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telangana',
    isWaitingList: true
  },

  // Cybersecurity Finalists
  {
    id: 'r2-22',
    teamName: 'ATHENS',
    teamLeader: 'Bhavesh Dharewa',
    teamLeaderEmail: 'bhaveshd7701@gmail.com',
    collegeName: 'Vasavi college of engineering',
    domain: 'Cybersecurity',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telengana',
    isWaitingList: false
  },
  {
    id: 'r2-23',
    teamName: 'Hackaholics',
    teamLeader: 'Thallapalli Suhaas Rao',
    teamLeaderEmail: 'suhaasrao28@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telengana',
    isWaitingList: false
  },
  {
    id: 'r2-24',
    teamName: 'Code blooded',
    teamLeader: 'P.Uday Kumar',
    teamLeaderEmail: 'udaykumarpendyalalikki@gmail.com',
    collegeName: 'Vasavi college of engineering',
    domain: 'Cybersecurity',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telengana',
    isWaitingList: false
  },
  {
    id: 'r2-25',
    teamName: 'Nexora',
    teamLeader: 'Gourishetti Jayaram',
    teamLeaderEmail: 'gourishettijayaram123@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telengana',
    isWaitingList: false
  },
  {
    id: 'r2-26',
    teamName: 'Alpha Duo',
    teamLeader: 'Akshitha Reddy',
    teamLeaderEmail: 'akshithareddy2405@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telengana',
    isWaitingList: false
  },
  // Cybersecurity Waiting List
  {
    id: 'r2-27',
    teamName: 'STROM BRAKERS',
    teamLeader: 'Anil Kumar',
    teamLeaderEmail: 'ch.anilkumar984@gmail.com',
    collegeName: 'BV Raju Institute of Technology',
    domain: 'Cybersecurity',
    round: 'Round 2 Finalists',
    cityState: 'Hyderabad, Telengana',
    isWaitingList: true
  },
  {
    id: 'r2-28',
    teamName: 'Varanasi',
    teamLeader: 'ADONI INDIRA',
    teamLeaderEmail: '239X1A3301@gprec.ac.in',
    collegeName: 'G. Pulla Reddy Engineering College (Autonomous)',
    domain: 'Cybersecurity',
    round: 'Round 2 Finalists',
    cityState: 'Kurnool, Andhra Pradesh',
    isWaitingList: true
  },

  // Round 1 Results (First Round)
  // Agritech Results
  {
    id: '43',
    teamName: 'Synergy',
    teamLeader: 'Madhavi',
    teamLeaderEmail: 'madhavi.2405054@srec.ac.in',
    collegeName: 'Sri Ramakrishna Engineering College',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '44',
    teamName: 'Hydrofusion',
    teamLeader: 'Laasya M',
    teamLeaderEmail: 'm.laasya07@gmail.com',
    collegeName: 'Vasavi college of Engineering',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '45',
    teamName: 'Code 4 Cause',
    teamLeader: 'Veeragandham Shreya',
    teamLeaderEmail: 'sveeragandham@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '46',
    teamName: 'Null Pointers',
    teamLeader: 'Anshul Singh',
    teamLeaderEmail: 'bt24cs034@nitmz.ac.in',
    collegeName: 'National Institute Of Technology, Mizoram',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '47',
    teamName: 'gnagalahari2005',
    teamLeader: 'G.Naga Lahari',
    teamLeaderEmail: 'gnagalahari2005@gmail.com',
    collegeName: 'G.Pulla Reddy Engineering College',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '48',
    teamName: 'Spirit',
    teamLeader: 'CH Ajith Reddy',
    teamLeaderEmail: 'ajithreddychittireddy@gmail.com',
    collegeName: 'Vardhaman College Of Engineering',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '49',
    teamName: 'agro_ally',
    teamLeader: 'hari kaushik',
    teamLeaderEmail: 'harikaushik2005@gmail.com',
    collegeName: 'vasavi college of engineering',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '50',
    teamName: 'Phoenix',
    teamLeader: 'Pavan kumar k',
    teamLeaderEmail: 'pavankumar2005712@gmail.com',
    collegeName: 'VNRVJIET',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '51',
    teamName: 'Tech Titans',
    teamLeader: 'Harsha Vardhan',
    teamLeaderEmail: 'harshavardhanvotte@gmail.com',
    collegeName: 'MVSR Engineering College',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '52',
    teamName: 'Team_Hack',
    teamLeader: 'Patan Sharukhan',
    teamLeaderEmail: 'sharukhan2005786@gmail.com',
    collegeName: 'G Pulla Reddy Engineering College',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '53',
    teamName: 'TRIAD',
    teamLeader: 'Vaishnav Tadakamadla',
    teamLeaderEmail: 'vaishnavtadakamadla5453@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '54',
    teamName: 'Synervate',
    teamLeader: 'Kolluru Kameswara Suryesh',
    teamLeaderEmail: 'suryakolluru22@gmail.com',
    collegeName: 'Amrita vishwa vidyapeetham, chennai',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '55',
    teamName: 'Vajppp',
    teamLeader: 'Jay Shreeram Yeraballi',
    teamLeaderEmail: '8jayram4@gmail.com',
    collegeName: 'University College Of Engineering, Osmania University',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '56',
    teamName: 'TrailBlazers',
    teamLeader: 'Vikaas Nalajala',
    teamLeaderEmail: 'vikaasnalajala@gmail.com',
    collegeName: 'CBIT',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '57',
    teamName: 'harisampathbellam',
    teamLeader: 'Bellam Hari Sampath',
    teamLeaderEmail: 'harisampathbellam@gmail.com',
    collegeName: 'Mahindra University',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '58',
    teamName: 'Null Pointers',
    teamLeader: 'Anshul Singh',
    teamLeaderEmail: 'bt24cs034@nitmz.ac.in',
    collegeName: 'National Institute Of Technology, Mizoram',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '17',
    teamName: 'navacharithasriramadasu',
    teamLeader: 'Navacharitha Sriramadasu',
    teamLeaderEmail: 'navacharithasriramadasu@gmail.com',
    collegeName: 'MVSR Engineering College',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '18',
    teamName: 'Snippets',
    teamLeader: 'Chethireddy Srikaran Reddy',
    teamLeaderEmail: 'mail2srikaran@gmail.com',
    collegeName: 'VNRVJIET',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '19',
    teamName: 'Vortex 3',
    teamLeader: 'Chinmanolla Gayathri',
    teamLeaderEmail: 'gayathrichinmanolla@gmail.com',
    collegeName: 'NEIL GOGTE INSTITUTE OF TECHNOLOGY',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '20',
    teamName: 'Vijayen',
    teamLeader: 'Hemanth balaji',
    teamLeaderEmail: 'hemanthbalaji021@gmail.com',
    collegeName: 'vasavi college of engineering',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '21',
    teamName: 'TechHarvesters',
    teamLeader: 'KENCHE SRIKAR',
    teamLeaderEmail: '24211a7257@bvrit.ac.in',
    collegeName: 'Bv raju institute of technology',
    domain: 'Agritech',
    round: 'Round 1',
    cityState: ''
  },

  // Round 1 Cybersecurity Results
  {
    id: '22',
    teamName: 'MUGEN',
    teamLeader: 'Amrabad Jaideep',
    teamLeaderEmail: 'amarabadjayadeep@gmail.com',
    collegeName: 'Nalla Narasimha Reddy Education Society\'s Group of Institutions',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '23',
    teamName: 'NeuralShield',
    teamLeader: 'Swathi Chippa',
    teamLeaderEmail: 'chippaswathi8@gmail.com',
    collegeName: 'Chaitanya Bharathi Institute of Technology, Hyderabad',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '24',
    teamName: 'Varanasi',
    teamLeader: 'ADONI INDIRA',
    teamLeaderEmail: '239X1A3301@gprec.ac.in',
    collegeName: 'G. Pulla Reddy Engineering College (Autonomous)',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '25',
    teamName: 'Tech Squad',
    teamLeader: 'Nangunuri Rishwitha',
    teamLeaderEmail: 'nangunuririshwitha@gmail.com',
    collegeName: 'Gokaraju Rangaraju Institute of Engineering & Technology',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '26',
    teamName: 'Hackaholics',
    teamLeader: 'Thallapalli Suhaas Rao',
    teamLeaderEmail: 'suhaasrao28@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '27',
    teamName: 'Nova',
    teamLeader: 'NITISH J M',
    teamLeaderEmail: 'nitishinwork@gmail.com',
    collegeName: 'SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '28',
    teamName: 'VOIDFORGE',
    teamLeader: 'Vishwaruban S',
    teamLeaderEmail: 'vishwarubanofficial@gmail.com',
    collegeName: 'Sri Krishna College of Engineering and Technology',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '29',
    teamName: 'Jake_Peralta',
    teamLeader: 'Vasist K',
    teamLeaderEmail: 'workvasist@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '30',
    teamName: 'Engineers',
    teamLeader: 'Shirisha',
    teamLeaderEmail: 'mangenapallyshirisha123@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '31',
    teamName: 'Chilukuruvarshini1405',
    teamLeader: 'Varshini chilukuru',
    teamLeaderEmail: 'Chilukuruvarshini1405@gmail.com',
    collegeName: 'Vasavi college of engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '32',
    teamName: 'Care Reach',
    teamLeader: 'Deepika Penta',
    teamLeaderEmail: 'deepikapenta@yahoo.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '33',
    teamName: 'Code blooded',
    teamLeader: 'Pendyala Uday Kumar',
    teamLeaderEmail: 'udaykumarpendyalalikki@gmail.com',
    collegeName: 'Vasavi college of engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '34',
    teamName: 'STROM BRAKERS',
    teamLeader: 'ANIL KUMAR B.V',
    teamLeaderEmail: 'ch.anilkumar984@gmail.com',
    collegeName: 'Raju Institute of Technology',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '35',
    teamName: 'Crew Four',
    teamLeader: 'Helona Aruri',
    teamLeaderEmail: 'helona0211@gmail.com',
    collegeName: 'Keshav Memorial Engineering College',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '36',
    teamName: 'sriaakarshnekkanti',
    teamLeader: 'Sri Aakarsh Nekkanti',
    teamLeaderEmail: 'sriaakarshnekkanti@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '37',
    teamName: 'SkunkWorks',
    teamLeader: 'Vikranth Tumma',
    teamLeaderEmail: 'vikrantht32@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '38',
    teamName: 'code maxing',
    teamLeader: 'Mohammed Shahzaman',
    teamLeaderEmail: '23h51a04n3@cmrcet.ac.in',
    collegeName: 'CMRCET',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '39',
    teamName: 'ATHENS',
    teamLeader: 'Bhavesh Dharewa',
    teamLeaderEmail: 'bhaveshd7701@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '40',
    teamName: 'Nexora',
    teamLeader: 'Gourishetti Jayaram',
    teamLeaderEmail: 'gourishettijayaram123@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '41',
    teamName: 'Cybersentinels',
    teamLeader: 'Rakesh Manthri',
    teamLeaderEmail: 'manthrirs06@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '42',
    teamName: 'Alpha Duo',
    teamLeader: 'AKSHITHA REDDY',
    teamLeaderEmail: 'akshithareddy2405@gmail.com',
    collegeName: 'VASAVI COLLEGE OF ENGINEERING',
    domain: 'Cybersecurity',
    round: 'Round 1',
    cityState: ''
  },

  // Round 1 HealthTech Results
  {
    id: '63',
    teamName: 'Vyoma',
    teamLeader: 'Anuja Kuchipudi',
    teamLeaderEmail: 'kuchipudianuja3@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '64',
    teamName: 'Moon Knight (old team name: 24215A3206)',
    teamLeader: 'Sanda Vinay',
    teamLeaderEmail: '24215a3206@bvrit.ac.in',
    collegeName: 'BVRIT Narsapur',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '65',
    teamName: 'RUN TIME TERRORS',
    teamLeader: 'Kumarkalava Mohammed Sowban',
    teamLeaderEmail: '249xa33106@gprec.ac.in',
    collegeName: 'G.Pulla Reddy Engineering College',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '66',
    teamName: 'Equilibria',
    teamLeader: 'A S Sreeram Varun Sharma',
    teamLeaderEmail: 'varunsreeram29@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '67',
    teamName: 'Team binary',
    teamLeader: 'Saatvik Cheruku',
    teamLeaderEmail: 'saatvikcheruku@gmail.com',
    collegeName: 'Lovely Professional University, Punjab',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '68',
    teamName: 'House Targaryen',
    teamLeader: 'P.Pardiv Sai Charan',
    teamLeaderEmail: 'pardeevpatti08@gmail.com',
    collegeName: 'Vasavi College of Engineering,Hyderabad',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '69',
    teamName: 'Tech phantoms',
    teamLeader: 'Pulumamidi Vinay Kumar',
    teamLeaderEmail: '239x1a33a6@gprec.ac.in',
    collegeName: 'G. Pulla Reddy Engineering College',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '70',
    teamName: 'Sriram Girish Chandran',
    teamLeader: 'Sriram Girish Chandran',
    teamLeaderEmail: 'sriramgirishc@gmail.com',
    collegeName: 'Sri Krishna College of Engineering and Technology - SKCET',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '71',
    teamName: 'The Debuggers',
    teamLeader: 'Mohammad Afrid Pasha',
    teamLeaderEmail: 'afridpasha1983@gmail.com',
    collegeName: 'Vasavi College of Engineering, Hyderabad',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '72',
    teamName: 'TechTeaMakers',
    teamLeader: 'Sri Vaishnavi',
    teamLeaderEmail: 'bondugulasrivaishnavi@gmail.com',
    collegeName: 'VNR VJIET',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '73',
    teamName: 'RedBull Coding',
    teamLeader: 'Sirna Sai Vishnu',
    teamLeaderEmail: 'sirna.vishnu05@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '74',
    teamName: 'POKURI SRIRAM',
    teamLeader: 'POKURI SRIRAM',
    teamLeaderEmail: 'pokurisriram55@gmail.com',
    collegeName: 'G Pulla Reddy Engineering College',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '75',
    teamName: '$a✓ishk@²r',
    teamLeader: 'Thirukovela Moulya',
    teamLeaderEmail: 'tmoulya2707@gmail.com',
    collegeName: 'Chaitanya Bharathi Institute Of Technology',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '76',
    teamName: 'm.saisushanth21',
    teamLeader: 'SAI SUSHANTH MOTURI',
    teamLeaderEmail: 'm.saisushanth21@gmail.com',
    collegeName: 'CBIT',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '77',
    teamName: 'MOOD VITALS',
    teamLeader: 'Kaipa Chaturya Reddy',
    teamLeaderEmail: 'kaipachaturyareddy7275@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '78',
    teamName: 'Tech Champions',
    teamLeader: 'SADIYA MAHEEN SIDDIQUI',
    teamLeaderEmail: 'adibasadiya9502@gmail.com',
    collegeName: 'University College of Engineering - Osmania University',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '79',
    teamName: 'Abcd',
    teamLeader: 'Panjugula Nitin Kumar Goud',
    teamLeaderEmail: 'nithinkumargoud1234@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '80',
    teamName: 'The TEAM',
    teamLeader: 'K.SaiRevanth',
    teamLeaderEmail: 'sairevanth040@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '81',
    teamName: 'Bridge things',
    teamLeader: 'Vaibhav Shahi',
    teamLeaderEmail: 'theshahivaibhav@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '82',
    teamName: 'Krusyatri',
    teamLeader: 'Laasya',
    teamLeaderEmail: 'mlaasy16@gmail.com',
    collegeName: 'CR RAO AIMSCS',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '83',
    teamName: 'Team Y',
    teamLeader: 'Malluri Vikas',
    teamLeaderEmail: 'vikasmalluri@gmail.com',
    collegeName: 'Mahatma Gandhi Institute of Technology',
    domain: 'HealthTech',
    round: 'Round 1',
    cityState: ''
  },

  // Round 1 Remote Sensing Results
  {
    id: '84',
    teamName: 'WE',
    teamLeader: 'Rathod Rupali',
    teamLeaderEmail: 'rupalirathod026@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '85',
    teamName: 'Sentinelx',
    teamLeader: 'Hrithik Tadepalli',
    teamLeaderEmail: 'tadepallihrithik@gmail.com',
    collegeName: 'Vasavi college of engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '86',
    teamName: 'UrbanSentinels',
    teamLeader: 'Nazia',
    teamLeaderEmail: 'mdnazia1467@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '87',
    teamName: 'Rural Development',
    teamLeader: 'Gardas Akash',
    teamLeaderEmail: 'akash39g@gmail.com',
    collegeName: 'CVR College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '88',
    teamName: 'OPS',
    teamLeader: 'Chakshu Varma Akkala',
    teamLeaderEmail: 'chakshu.akkala@gmail.com',
    collegeName: 'Vasavi College of Engineeering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '89',
    teamName: 'charan and team',
    teamLeader: 'K Sri Charan Goud',
    teamLeaderEmail: 'katamonisricharan@gmail.com',
    collegeName: 'University College of Engineering, Osmania University (UCEOU)',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '90',
    teamName: 'Team Sharanga',
    teamLeader: 'Gummadi Karuna Sree',
    teamLeaderEmail: 'karunasreegummadi04@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '91',
    teamName: 'Code Crusaders',
    teamLeader: 'M Bhuvana',
    teamLeaderEmail: 'miriyalabhuvana14@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '92',
    teamName: '921132dhanasrisoli',
    teamLeader: 'Dhana Sri Soli',
    teamLeaderEmail: '921132dhanasrisoli@gmail.com',
    collegeName: 'Chaitanya Bharathi Institute of Technology',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '93',
    teamName: 'Kanaparthi Mohan Reddy',
    teamLeader: 'Kanaparthi Mohan Reddy',
    teamLeaderEmail: '239x1a3247@gprec.ac.in',
    collegeName: 'G Pulla Reddy Engineering College',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '94',
    teamName: 'KeyNova',
    teamLeader: 'Lathika',
    teamLeaderEmail: 'lathikasasimanikandan@gmail.com',
    collegeName: 'Karpagam College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '95',
    teamName: 'NoCode Devs',
    teamLeader: 'J.Akhil',
    teamLeaderEmail: 'akhil.j12314@gmail.com',
    collegeName: 'Vasavi College Of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '96',
    teamName: 'Vasuki',
    teamLeader: 'M Srikar Rao',
    teamLeaderEmail: 'mahendarkarsrikarrao@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '97',
    teamName: 'Continuum',
    teamLeader: 'Jasmitha V',
    teamLeaderEmail: 'v.jasmitha143@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '98',
    teamName: 'Runtime Rebel\'s',
    teamLeader: 'Tupakula Siva Shankar',
    teamLeaderEmail: 'tupakulashiva13@gmail.com',
    collegeName: 'vasavi college of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '99',
    teamName: 'Runtime Terror',
    teamLeader: 'Jakkampudi Gowtam Sai',
    teamLeaderEmail: 'gowtamsai911@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '100',
    teamName: 'Geo Vision',
    teamLeader: 'Gantyala Naveen',
    teamLeaderEmail: 'gantyalanaveen1234@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '101',
    teamName: 'Crusaders',
    teamLeader: 'Shivani',
    teamLeaderEmail: 'eshivani07@gmail.com',
    collegeName: 'Vasavi College of Enginnerng',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '102',
    teamName: 'Hackstreet',
    teamLeader: 'keerthana',
    teamLeaderEmail: 'bkeerthana2211@gmail.com',
    collegeName: 'Vasavi College of Enginnerng',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '103',
    teamName: 'Debugging therapists',
    teamLeader: 'Sriram S',
    teamLeaderEmail: 'sriramvinu2007@gmail.com',
    collegeName: 'Sri Krishna college of engineering and technology',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  },
  {
    id: '104',
    teamName: 'Sakha',
    teamLeader: 'Gudipally Nishanth reddy',
    teamLeaderEmail: 'gnishanthreddy0513@gmail.com',
    collegeName: 'Vasavi College of Engineering',
    domain: 'Remote Sensing',
    round: 'Round 1',
    cityState: ''
  }
]

const domains = ['All', 'Agritech', 'Cybersecurity', 'HealthTech', 'Remote Sensing']
const rounds = ['Round 2 Finalists', 'Round 1']

export default function ResultsPage() {
  const [selectedDomain, setSelectedDomain] = useState('All')
  const [selectedRound, setSelectedRound] = useState('Round 2 Finalists') // Default to Round 2
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    let filtered = mockData
    
    // Always filter by round (no "All" option)
    filtered = filtered.filter(team => team.round === selectedRound)
    
    // Filter by domain (if not "All")
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
  }, [selectedDomain, selectedRound, searchTerm])

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
            <h1 className="page-title">Tech Savishkaar 4.0 - Results</h1>
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
          {/* Search and Filter Bar - Combined */}
          <div className="search-filter-container">
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
            <div className="domain-dropdown">
              <select 
                value={selectedDomain} 
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="domain-select"
              >
                {domains.map(domain => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Round Filter - Compact Pills */}
          <div className="round-filter-pills">
            <div className="round-filter-label">
              <Filter size={18} />
              <span>Select Round:</span>
            </div>
            <div className="round-pills">
              {rounds.map(round => (
                <button
                  key={round}
                  className={`round-pill ${selectedRound === round ? 'active' : ''}`}
                  onClick={() => setSelectedRound(round)}
                >
                  {round}
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
                    <th>
                      <div className="table-header">
                        <Building size={16} />
                        <span>City & State</span>
                      </div>
                    </th>
                    <th>
                      <div className="table-header">
                        <Filter size={16} />
                        <span>Status</span>
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
                      <td className="college">{team.cityState}</td>
                      <td>
                        {team.round === 'Round 1' ? (
                          <span className="prefinalist-badge">Prefinalist</span>
                        ) : team.isWaitingList ? (
                          <span className="waiting-list-badge">Waiting List</span>
                        ) : (
                          <span className="finalist-badge">Finalist</span>
                        )}
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
