import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from "react-moment";

class Education extends Component {
    render() {
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.form}</Moment> -
                    {edu.to === null ? (
                        'NOW'
                    ) : (
                        <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                    )}
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))
        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th />
                    </tr>
                    {education}
                    </thead>
                </table>
            </div>
        );
    }
}

Education.propTypes = {};

export default Education;