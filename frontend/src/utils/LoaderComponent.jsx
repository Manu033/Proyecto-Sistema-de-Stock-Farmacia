import { Rings } from "react-loader-spinner";

const LoaderComponent = () => {
  return (
    <>
      <Rings
        visible={true}
        height="150"
        width="1500"
        color="#2dd4bf"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
      />
    </>
  );
};
export default LoaderComponent;
