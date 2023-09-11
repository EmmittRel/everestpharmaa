import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import '../components/OurTeam.css';

const client = createClient({
    space: "j389y3dfrbxy",
    environment: "master",
    accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8"
});

function OurTeam() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await client.getEntries({ content_type: 'teamMember' });
        setTeamMembers(response.items);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div>
      <section className="section">
        <div className="our_team flow-content">
          <div className="top_headd">
            <h1>Meet Our Team</h1>
          </div>
          <ul role="list" className="grids">
            {teamMembers.map((member) => (
              <li key={member.sys.id}>
                <article className="cards" data-visible="false">
                  <div className="card__front flow-content">
                    <img
                      className="card__img mx-auto"
                      src={member.fields.image.fields.file.url}
                      alt={member.fields.name}
                    />
                    <div className="flow-content" data-spacing="sm">
                      <p className="card__name">{member.fields.name}</p>
                      <p className="card__position">{member.fields.position}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default OurTeam;
