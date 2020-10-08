import React, {useState, useEffect} from 'react';
import axios from "axios";
import Spinner from "../common/Spinner";

const ProfileList = () => {

    const [result, setResults] = useState({
        profiles: [],
        profileError: null,
        loading: true
    })

    const makeRequest = (path, params) =>
        axios.get(`/api/profile/all`, {
            params: {
                ...params
            },
        })

    const getAnything = async (path, params = {}) => {
        try {
            const {
                data
            } = await makeRequest(path, params);
            return [data, null];
        } catch (e) {
            console.log(e);
            return [null, e];
        }
    }

    const getData = async () => {
        const [profiles, profileError] = await getAnything("/");
        setResults({
            profiles,
            profileError,
            loading: false
        })
        console.log(profiles)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="profiles">
            <div className="container">
                <div className="row">
                    <div className="col-mid-8 m-auto">
                        <h1 className={"display-4 text-center"}>Profile List</h1>
                        <p className={"lead text-center"}>
                            Here you can browse through all of our users.
                        </p>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileList;