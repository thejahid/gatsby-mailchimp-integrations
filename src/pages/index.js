import React from "react"
import {Button, Form, FormGroup, Input} from "reactstrap"
import addToMailchimp from 'gatsby-plugin-mailchimp'
import Logo from "../images/logo.png"
import "../styles/index.css"
import "bootstrap/dist/css/bootstrap.min.css";

export default class IndexPage extends React.Component {
    state = {
        nam1: null,
        nam2:null,
        email: null,
    }

    _handleChange = (e) => {
        console.log({
            [`${e.target.name}`]: e.target.value,
        });
        this.setState({
            [`${e.target.name}`]: e.target.value,
        });
    }

    _handleSubmit = (e) => {
        e.preventDefault();

        console.log('submit', this.state);

        addToMailchimp(this.state.email, {
            FIRSTNAME: this.state.nam1,
            LASTNAME: this.state.nam2
          })
            .then(({ msg, result }) => {
                console.log('msg', `${result}: ${msg}`);

                if (result !== 'success') {
                    throw msg;
                }
                alert(msg);
            })
            .catch((err) => {
                console.log('err', err);
                alert(err);
            });
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <Form onSubmit={this._handleSubmit} className="text-center subscribe">
                    <img className="mb-4" src={Logo} alt="Developer Jahid" />
                    <FormGroup>
                    <Input
                        onChange={this._handleChange}
                        type="text"
                        name="nam1"
                        placeholder="First Name"
                    />
                    </FormGroup>
                    <FormGroup>
                    <Input
                        onChange={this._handleChange}
                        type="text"
                        name="nam2"
                        placeholder="Last Name"
                    />
                    </FormGroup>
                    <FormGroup>
                    <Input
                        onChange={this._handleChange}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                    />
                    </FormGroup>
                    <Button type="submit" color="primary">
                    Submit
                    </Button>
                    <p className="me">
                    Developed by <a href="https://developerjahid.com">Developer Jahid</a>
                    </p>
                    <p>hire me: contact@developerjahid.com</p>
                    <p>developerjahid.com</p>
                </Form>
            </div>
        );
    }
}
