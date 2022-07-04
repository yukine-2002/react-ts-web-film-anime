import React from "react";
import Slider,{Settings} from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


interface ArrowButtonProps {
  onClick?: () => void;
}
const ArrowLeft = (props :ArrowButtonProps) => {
  const { onClick } = props;
  return (
      <button  onClick={onClick}  type='button' className='slick-prev pull-left'><i  className='fa fa-angle-left' aria-hidden='true'></i></button>
  )
};

const ArrowRight = (props :ArrowButtonProps) => {
const { onClick } = props;
return (
  <button  onClick={onClick} type='button' className='slick-next pull-right'><i  className='fa fa-angle-right' aria-hidden='true'></i></button>
)
};

interface PropsSlick  {
  setting? : Settings,
  children : React.ReactNode,
  className ? : string
}

 const  SlickCarousel   = ({setting,children,className} : PropsSlick) => {
  
    const settings = {
      prevArrow:<ArrowLeft />,
      nextArrow: <ArrowRight />
    };
    
    const defaulSetting = {...settings,...setting}
    return (
    <div>
      <Slider className={className}  {...defaulSetting}>
          {children}
      </Slider>
    </div>
    )
     
}
export default SlickCarousel