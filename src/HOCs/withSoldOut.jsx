import styles from "./withSoldOut.module.css";

function withSoldOut(WrappedComponent) {
  return ({ soldOut, ...props }) => {
    return soldOut ? (
      <div className={styles.grayOverlay}>
        <WrappedComponent {...props} />
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
}

export default withSoldOut;
