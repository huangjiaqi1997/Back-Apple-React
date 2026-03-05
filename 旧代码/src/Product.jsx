function Product({name}) {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}

function withA(WrappedComponent) {
  return <div>
    <WrappedComponent />
  </div>
}

export default Product