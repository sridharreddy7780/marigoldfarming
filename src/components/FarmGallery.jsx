import Photo from './Photo'

const photos = [
  { name: 'marigold-plants', alt: 'Orange marigolds blooming among green farm plants', caption: 'Marigold plants in bloom' },
  { name: 'yellow-banti', alt: 'Yellow marigolds growing in the field', caption: 'Yellow Banti in the field' },
  { name: 'orange-banti', alt: 'Fresh orange marigold flowers', caption: 'Fresh orange Banti' },
  { name: 'marigold-sacks', alt: 'Fresh yellow and orange marigolds gathered in sacks', caption: 'Harvested flowers in sacks' },
  { name: 'harvest-sack', alt: 'Farm worker carrying a sack through a marigold field', caption: 'Flower harvest' },
  { name: 'farmer', alt: 'Farmer tending marigolds among green plants', caption: 'Growing at the farm' },
]

export default function FarmGallery() {
  return (
    <section className="section farm-gallery" aria-labelledby="farm-gallery-heading">
      <div className="container">
        <div className="head reveal">
          <h2 id="farm-gallery-heading">పూల తోట నుంచి పంట వరకు</h2>
          <p>Marigold plants, flowers and harvest</p>
        </div>
        <div className="farm-gallery__grid">
          {photos.map((photo, index) => (
            <figure className={`farm-gallery__item farm-gallery__item--${index + 1} reveal`} key={photo.name}>
              <div className="farm-gallery__image"><Photo name={photo.name} alt={photo.alt} /></div>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}