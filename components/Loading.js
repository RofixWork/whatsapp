import SyncLoader from "react-spinners/SyncLoader";
const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <SyncLoader color="#1d9b12" />
    </div>
  );
};
export default Loading;
