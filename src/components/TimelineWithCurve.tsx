import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type TimelineItem = {
  date: string;
  title: string;
  description: string;
  isCurrent?: boolean;
};

export default function TimelineWithCurve() {
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const timelineItems: TimelineItem[] = [
    {
      date: '1st Feb 2026',
      title: 'Coding & Ideation Round',
      description: 'Test your coding skills and showcase your innovative thinking through a coding challenge. Keep your tech stack and project abstract ready to upload immediately after the test.',
      isCurrent: true
    },
    {
      date: '1st Feb - 08 Feb 2026',
      title: 'Idea Submission',
      description: 'Submit your detailed idea along with a video demonstration of your working prototype, highlighting its innovation, feasibility, and potential impact.'
    },
    {
      date: '12th Feb 2026',
      title: 'Final Round',
      description: 'Shortlisted teams will present their projects to a panel of judges. The top teams will be selected based on innovation, technical complexity, and presentation skills.'
    },
    {
      date: '21st Feb 2026',
      title: 'Hackathon Day',
      description: 'Finalists will work on their projects and present their solutions. Winners will be announced at the end of the day.'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Timeline</h2>
        
        <div className="relative" ref={timelineRef}>
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500 transform -translate-x-1/2"></div>
          
          {/* Timeline items */}
          <div className="space-y-16">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const itemClass = isMobile 
                ? 'flex-col items-start'
                : `flex-row ${isEven ? 'flex-row-reverse' : ''} items-center`;
              
              return (
                <motion.div
                  key={index}
                  className={`flex ${itemClass} relative`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Date */}
                  <div className={`${isMobile ? 'w-full mb-4' : 'w-1/2'} ${isEven ? 'pr-8' : 'pl-8'}`}>
                    <div className={`${isMobile ? 'text-left' : isEven ? 'text-right' : 'text-left'}`}>
                      <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-2">
                        {item.date}
                      </span>
                      {item.isCurrent && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  
                  {/* Card */}
                  <div className={`${isMobile ? 'w-full' : 'w-1/2'} ${isEven ? 'pl-8' : 'pr-8'}`}>
                    <div className={`p-6 bg-white rounded-lg shadow-md border border-gray-100 ${isMobile ? 'ml-6' : ''}`}>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}