import React from "react";

function Card({ name, image, onClick }) {
	return (
		<div
			className='card'
			onClick={onClick}
			role='button'
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onClick();
				}
			}}
			tabIndex='0'
		>
			<div className='card-content'>
				<img src={image} alt='' /> {/* Empty alt because image is described by text near it */}
				<p>{name}</p>
			</div>
		</div>
	);
}

export default React.memo(Card);
