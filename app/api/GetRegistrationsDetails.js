import { useState, useEffect } from 'react';
import { Constants } from '../constants/credentials';


const mobileNumber = Constants.mobileNumber;
const companyId = Constants.companyId;
const token = Constants.token;

export const GetRegistrationDetails = () => {
    // const [data, setData] = useState(null);
    let data;
    const getData = async () => {
        const resp = await fetch(`http://183.83.219.144:81/LMS/Registration/GetRegistrations/${companyId}?mobileNumber=${mobileNumber}`, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${token}`
            }),
        })
        const data = await resp.json();
        data = data[0];
    };

    //on first mount, fetch data.
    useEffect(() => {
        getData();
    }, []);
    // console.log(data);
    return data;
}