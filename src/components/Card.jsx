export default function Card({name, image, onClick}) {
    return(
        <div className='card' onClick={onClick} role="button">
            <div className="card-content">
                <img src={image} alt={name}/>
                <p>{name}</p>
            </div>
        </div>
    )
}
