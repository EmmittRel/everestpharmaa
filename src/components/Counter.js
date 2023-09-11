import React, { useEffect, useState } from 'react';
import '../components/Counter.css';
import * as contentful from 'contentful';

const Counter = () => {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    const client = contentful.createClient({
        space: "j389y3dfrbxy",
        environment: "master",
        accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8"
    });

    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'counter',
        });

        const fetchedCounters = response.items.map(item => {
          return {
            name: item.fields.name,
            target: item.fields.target,
            current: 0,
          };
        });

        setCounters(fetchedCounters);
      } catch (error) {
        console.log('Error fetching counter data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prevCounters =>
        prevCounters.map(counter => {
          if (counter.current < counter.target) {
            return { ...counter, current: counter.current + 1 };
          } else {
            return counter;
          } 
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wrapper">
      {counters.map((counter, index) => (
        <div className="item" key={index}>
          <p className={`counter counter${index + 1}`}>{counter.current}</p>
          <div className="name">{counter.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Counter;