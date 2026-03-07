import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import './CarVoting.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const carsData = [
  {
    brand: 'VW Polo',
    image: 'https://th.bing.com/th/id/OIP.CJVeaCysOdhf3YtKKGVPZwAAAA?rs=1&pid=ImgDetMain',
    price: 'R 270,000',
    features: ['1.0L TSI Engine', '5-Star Safety Rating', 'Apple CarPlay/Android Auto', 'Fuel Efficiency: 5.5L/100km']
  },
  {
    brand: 'Hyundai Grand i10',
    image: 'https://th.bing.com/th/id/R.a1e0c72bc540f6be0b6aed35506b0a8d?rik=LMO%2bGVytxJJknA&pid=ImgRaw&r=0',
    price: 'R 210,000',
    features: ['1.2L Kappa Engine', 'Spacious Interior', 'Touchscreen Infotainment', 'Fuel Efficiency: 5.8L/100km']
  },
  {
    brand: 'Suzuki Baleno',
    image: 'https://cdni.autocarindia.com/ExtraImages/20220228061914_Maruti_Baleno_2022_front.jpg',
    price: 'R 235,000',
    features: ['1.2L DualJet Engine', 'Hybrid Option Available', 'Heads-Up Display', 'Fuel Efficiency: 5.1L/100km']
  },
  {
    brand: 'KIA Picanto',
    image: 'https://topauto.co.za/wp-content/uploads/2021/02/KIA-Picanto-X-Line-header.jpg',
    price: 'R 195,000',
    features: ['1.2L Engine', 'Urban Efficiency', '7-Year Warranty', 'Compact Design']
  },
  {
    brand: 'Toyota Starlet',
    image: 'https://businesstech.co.za/news/wp-content/uploads/2023/04/toyota-starlet.jpg',
    price: 'R 230,000',
    features: ['1.5L Engine', 'Budget-Friendly', 'Reliable', 'Low Maintenance']
  },
  {
    brand: 'Suzuki Swift',
    image: 'https://businesstech.co.za/news/wp-content/uploads/2022/12/Suzuki-Swift-2021-160-_-Resized-1.webp',
    price: 'R 245,000',
    features: ['1.2L Engine', 'Sporty Design', 'Agile Handling', 'Modern Features']
  }
];

const chartColors = ['#ff4444', '#00C4B4', '#FFD700', '#1ecbe1', '#702dd2', '#fe0d01'];

function CarVoting() {
  const [votes, setVotes] = useState(() => {
    const saved = localStorage.getItem('carVotes');
    return saved ? JSON.parse(saved) : carsData.reduce((acc, car) => ({ ...acc, [car.brand]: 0 }), {});
  });
  const [chartType, setChartType] = useState('bar');
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    'https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_large/10233224/2024-Volkswagen-Polo-10-TSI-Life-Auto.jpg',
    'https://businesstech.co.za/news/wp-content/uploads/2022/12/Suzuki-Swift-2021-160-_-Resized-1.webp',
    'https://businesstech.co.za/news/wp-content/uploads/2023/04/toyota-starlet.jpg'
  ];

  useEffect(() => {
    localStorage.setItem('carVotes', JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleVote = (brand) => {
    setVotes(prev => ({ ...prev, [brand]: prev[brand] + 1 }));
  };

  const resetVotes = () => {
    const resetVotes = carsData.reduce((acc, car) => ({ ...acc, [car.brand]: 0 }), {});
    setVotes(resetVotes);
    localStorage.removeItem('carVotes');
  };

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
  
  const sortedCars = [...carsData].sort((a, b) => votes[b.brand] - votes[a.brand]);

  const chartData = {
    labels: carsData.map(car => car.brand),
    datasets: [{
      label: 'Votes',
      data: carsData.map(car => votes[car.brand]),
      backgroundColor: chartColors,
      borderColor: chartColors.map(color => color),
      borderWidth: 2
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: chartType === 'pie',
        position: 'bottom',
        labels: {
          color: '#fff',
          font: { size: 12 }
        }
      },
      title: {
        display: true,
        text: 'Vote Distribution',
        color: '#fff',
        font: { size: 18 }
      }
    },
    scales: chartType === 'bar' ? {
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    } : {}
  };

  return (
    <div className="car-voting">
      {/* Header */}
      <header className="car-voting-header">
        <div className="logo">
          <span>🚗</span>
          <span>CarVote 2025</span>
        </div>
        <nav>
          <a href="#vote">Vote</a>
          <a href="#leaderboard">Leaderboard</a>
          <a href="#chart">Chart</a>
        </nav>
      </header>

      {/* Developer Profile */}
      <section className="developer-profile">
        <img src={`${import.meta.env.BASE_URL}images/334066167_148732571438811_7406887273882172408_n.jpg`} alt="Developer" className="developer-image" />
        <div className="developer-info">
          <h2>Simangaliso Mazweni Ntuli</h2>
          <p className="developer-title">Front-End Developer</p>
          <div className="developer-skills">
            <span className="skill-tag">HTML5</span>
            <span className="skill-tag">CSS3</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">React</span>
            <span className="skill-tag">Java</span>
            <span className="skill-tag">Python</span>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="carousel-section">
        <div className="carousel-container">
          {carouselImages.map((img, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="carousel-dots">
            {carouselImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="intro">
        <div className="intro-content">
          <h2>Welcome to Car Voting for Budget Cars 2025</h2>
          <p>Vote for your favorite budget car and explore the most popular models of 2025!</p>
          <div className="total-votes-display">
            Total Votes: <strong>{totalVotes}</strong>
          </div>
        </div>
      </section>

      {/* Voting Section */}
      <section className="voting-section" id="vote">
        <h2>Vote for Your Favorite Car</h2>
        <div className="car-grid">
          {carsData.map((car) => (
            <div key={car.brand} className="car-card">
              <div className="vote-count">{votes[car.brand]}</div>
              <div className="car-image">
                <img src={car.image} alt={car.brand} />
              </div>
              <h3>{car.brand}</h3>
              <p className="car-price">{car.price}</p>
              <ul className="car-features">
                {car.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="vote-btn" onClick={() => handleVote(car.brand)}>
                Vote
              </button>
            </div>
          ))}
        </div>
        <button className="reset-btn" onClick={resetVotes}>
          Reset All Votes
        </button>
      </section>

      {/* Leaderboard */}
      <section className="leaderboard-section" id="leaderboard">
        <h2>Leaderboard</h2>
        <div className="leaderboard">
          {sortedCars.map((car, index) => {
            const percentage = totalVotes > 0 ? Math.round((votes[car.brand] / totalVotes) * 100) : 0;
            return (
              <div key={car.brand} className="leaderboard-item">
                <div className="leaderboard-rank">#{index + 1}</div>
                <div className="leaderboard-car">
                  <img src={car.image} alt={car.brand} />
                  <span>{car.brand}</span>
                </div>
                <div className="leaderboard-votes">
                  <span>{votes[car.brand]} votes ({percentage}%)</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: chartColors[index % chartColors.length]
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chart Section */}
      <section className="chart-section" id="chart">
        <h2>Vote Statistics</h2>
        <div className="chart-controls">
          <button 
            className={chartType === 'bar' ? 'active' : ''} 
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </button>
          <button 
            className={chartType === 'pie' ? 'active' : ''} 
            onClick={() => setChartType('pie')}
          >
            Pie Chart
          </button>
        </div>
        <div className="chart-container">
          {chartType === 'bar' ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <Pie data={chartData} options={chartOptions} />
          )}
        </div>
      </section>
    </div>
  );
}

export default CarVoting;
