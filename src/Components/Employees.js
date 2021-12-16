import axios from "axios";
import { useState, useEffect } from 'react';
import Employee from "./Employee";
import Loader from "react-loader-spinner";
import background from "./png.png"
import ParticlesBg from 'particles-bg'
import Typewriter from 'typewriter-effect';


function Employees() {

    const [employeeData, setEmployeeData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(getEmployees, []); 

    function getEmployees() {
        axios.get('https://statenweb.mockable.io/employees').then(function(response){
            // console.log(response.data);
            setEmployeeData(response.data);
        });
    }

    function getEmployeeById(id) {
        // console.log(`You clicked on ${id}`);
        setSelectedEmployee(id);
    }

    if(employeeData.length === 0) {
        return <div className="text-center my-5"><Loader
        type="Puff"
        color="#00BFFF"
        height={300}
        width={300}
        timeout={3000} //3 secs        
      />
      </div>
    }

    if(selectedEmployee) {
         return( 
        //  <div className="background-img px-2 py-3" style={{
        //     backgroundImage: `url(${background})`,
        //     height: '100%',
        //     width: '100%',
        //     backgroundPosition: 'center',
        //     backgroundSize: 'cover'
        //     }}>
        <div>
            <Employee selectedEmployee={selectedEmployee}/>
            <button className="btn btn-secondary" onClick={() => setSelectedEmployee(null)}>Return</button>
         </div>
         )
    }

    return (
        
        <div className="shadow-lg p-3 mb-5 bg-white rounded my-5 px-5 py-4">
            <ParticlesBg type="cobweb" bg={true} />
            <div className="header bg-dark rounded px-5 py-3">
                <h1 className="text-light text-center my-3">
                    <Typewriter
                    options={{
                    strings: [`Employee Database`],
                        autoStart: true,
                        loop: true
                         }}
                        /></h1>
                    <div className="employees my-3">
                        {employeeData.map((employee) => <p key={employee.id} className="row align-items-center">
                        <button className="btn btn-primary" onClick={() => getEmployeeById(employee.id)}>{employee.name}</button></p>)}
                    </div>
            </div>
        </div>
    )
}

export default Employees;