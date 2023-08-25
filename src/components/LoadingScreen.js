import { Spin } from "antd";


export const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen gap-x-2">
      <Spin />
      Loading...
    </div>
  );
};
