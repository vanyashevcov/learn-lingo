import PropTypes from 'prop-types';

const Icon = ({ 
  name, 
  width = 16, 
  height = 16, 
  fill = "none", 
  stroke = "currentColor",
  className = "" 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      fill={fill} 
      stroke={stroke}
      className={className}
    >
      <use href={`/sprite.svg#icon-${name}`}></use>
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  className: PropTypes.string
};

export default Icon; 