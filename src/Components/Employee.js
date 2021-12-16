import axios from 'axios';
import { useEffect, useState }  from 'react';
import Loader from "react-loader-spinner";
import ParticlesBg from 'particles-bg'
import Typewriter from 'typewriter-effect';


function Employee({selectedEmployee}) {
                    //(props)
    //const selectedEmployee = props.selectedEmployees;
    // const { selectedEmployee } = props;

    const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);

    useEffect(() => {
        axios.get(`http://statenweb.mockable.io/employee/${selectedEmployee}`).then((r) => setSelectedEmployeeData(r.data));
    }, [selectedEmployee]);

    if(!selectedEmployeeData) {
        return <div className="text-center my-5">
            <Loader
        type="Puff"
        color="#00BFFF"
        height={300}
        width={300}
        timeout={3000} //3 secs
      />
      </div>
    }

    const {
        name,
        startDate,
        role,
        department,
        photo
    } = selectedEmployeeData;


    const styleObj = {
        fontSize: 64
    }

    return( 
         
    <div className="container d-flex justify-content-center my-5"> 
        <div className="row">
            <div className="col-sm-6 my-5">
            <h1 style={styleObj}><Typewriter
                options={{
                strings: [`Welcome, this is our employee ${name} working in the ${department} department.`],
                autoStart: true,
                loop: true}}/></h1>
                </div>
            <div className="col-sm-6">
                <ParticlesBg type="cobweb" bg={true} />   
            <div class="card my-5" style={{width: "20rem"}}>
                    <img style={{maxHeight:'100%'}} src={photo} alt={name} /> 
                <div class="card-body">
                    <h5 class="card-title text-center">{name}</h5>
                    <p>Department: {department}</p>
                    <p>Job Role: {role} </p>
                    <p>Start Date: {startDate} </p>
                </div>
            </div>
            </div>
        </div>
    </div>

    
    )

}

export default Employee;