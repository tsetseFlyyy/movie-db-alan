export const Footer = () => {
  const date = new Date(Date.now()).getFullYear();
  console.log(date);
  return (
    <footer className="footer container">
      <p
        style={{
          fontFamily: "Nothing You Could Do, cursive",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Made by Bekov Alan
        <br /> 2022
      </p>
      {/*<p style={{fontFamily: 'Nothing You Could Do, cursive', fontSize: '30px', textAlign: 'center'}}>Made by Shalkar Koshenayev <br /> 2022</p>*/}
    </footer>
  );
};
