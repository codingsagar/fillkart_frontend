import SimpleImageSlider from "react-simple-image-slider";

const images1 = [
  {
    url: "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/c4082eaf57fcfd0e.jpg?q=50",
  },
  {
    url: "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/474c69a2c8f12e5d.png?q=50",
  },
  {
    url: "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/a3573f74ec1e7359.jpeg?q=50",
  },
  {
    url: "https://rukminim1.flixcart.com/flap/3376/560/image/75a15c3e19c3f7de.jpg?q=50",
  },
  {
    url: "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/4e4ae20bb304952c.jpg?q=50",
  },
];

const images2 = [
  {
    url: "https://rukminim1.flixcart.com/fk-p-flap/1100/500/image/c3099db2ef1e4830.jpg?q=20",
  },
  {
    url: "https://rukminim1.flixcart.com/fk-p-flap/1100/500/image/8dcfa1d30a315cfb.jpg?q=20",
  },
  {
    url: "https://rukminim1.flixcart.com/fk-p-flap/1100/500/image/0a27f8f2abb342fe.jpeg?q=20",
  },
  {
    url: "https://rukminim1.flixcart.com/fk-p-flap/1100/500/image/8d7e34a25123f58c.jpg?q=90",
  },
];

const Slider = () => {
  let width = window.innerWidth;
  return (
    <div className="flex justify-center mt-6">
      <SimpleImageSlider
        width={width > 1000 ? width - 50 : width - 20}
        height={width > 1000 ? 250 : 150}
        images={width > 1000 ? images1 : images2}
        showBullets={true}
        showNavs={true}
        loop={true}
        autoPlay={true}
        slideDuration={0.8}
      />
    </div>
  );
};

export default Slider;
