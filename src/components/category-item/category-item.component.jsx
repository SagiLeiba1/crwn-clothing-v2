import './category-item.styles.scss';
import Button from '../button/button.component';
const CategoryItem = ({category}) => {
    const {title, imageUrl} = category;
    return (
        <div     className="category-container">
          <div 
              className='background-image' style={{
              backgroundImage: `url(${imageUrl})`
            }} 
          />
          <div className="category-body-container">
            <h2> {title} </h2>
            <Button buttonType='inverted'> Shop Now </Button>
          </div>
        </div>
    )
}

export default CategoryItem