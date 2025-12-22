
interface Props{
    color:string,
    labelcolor:string,
    completed:number,
    total:number,
    message:string,
}
const ProgressBar = ({completed,total,color,labelcolor,message}:Props) => {
    // const [color, setColor] = useState("red");
    // console.log(completed);
    
    const completed_dec = (completed * 100).toFixed(2);
    const width= completed>0 ? `${completed_dec}%` : "0.00%";

    const containerStyles = {
      height: 30,
      width: '200px',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 1,
      marginLeft: 0,
      marginRight:100,
      position: 'relative' as React.CSSProperties['position'],
    }
    
    const fillerStyles = {
      height: '100%',
      width: width, // Si completed es 0, el width será 0%
      backgroundColor: completed > 0 ? color : 'transparent', // No mostrar color si el progreso es 0
      borderRadius: 'inherit',
      transition: 'width 0.3s ease-in-out', // Transición suave del relleno
    };
  
    const labelStyles = {
      padding: 5,
      color: labelcolor,
      fontWeight: 'bold',
      position: 'absolute' as React.CSSProperties['position']
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{message}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  