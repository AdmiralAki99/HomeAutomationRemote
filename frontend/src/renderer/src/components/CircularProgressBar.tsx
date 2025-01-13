import { Component } from 'react';

type CircularProgressBarProps = {
  size: number; // Diameter of the circle
  progress: number; 
  strokeWidth?: number;
  color?: string; 
  backgroundColor?: string;
  text?: string;
};

class CircularProgressBar extends Component<CircularProgressBarProps> {
  render() {
    const { size, progress, strokeWidth = 8, color = '#21d07a', backgroundColor = 'rgba(0, 0, 0, 0.1)' } = this.props;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate by -90 degrees
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate by -90 degrees
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        {/* Center text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="20px"
          fill="#fff"
        >
          {(this.props.text) ? this.props.text : progress.toFixed(1)}
        </text>
      </svg>
    );
  }
}

export default CircularProgressBar;