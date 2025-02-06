import React from "react";

function Card({ name, image, onClick }) {
	return (
		<div className='card' onClick={onClick} role='button'>
			<div className='card-content'>
				<img src={image} alt='' />
				<p>{name}</p>
			</div>
		</div>
	);
}

export default React.memo(Card);
