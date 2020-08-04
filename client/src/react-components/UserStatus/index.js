import React from "react";
import "./styles.css";
import Login from "./Login";
import SignUp from "./SignUp";

/**
 * Displays user status to indicate whether the user have logged in.
 *
 * Props: 
 * - currentUser: user currently logged in otherwise null
 * - openLoginMenu: a function to set current mode and current popup to login
 * - logout: a fuction to update current user as null
 */
class UserStatus extends React.Component {
    render() {
        // TODO: Get user status from server (phase 2)
        const messageStyle = {fontWeight: "bold", display: "inline" };
        const message = this.props.currentUser ? (
            <h2 className="userStatus" style={messageStyle}>
                Welcome back, {this.props.currentUser.username}!
            </h2>
        ) : (
            <button className="userStatus hoverOrange" type="button" onClick={this.props.openLoginMenu} style={messageStyle}>
                Login or Sign Up Here!
            </button>
        );

        const logOut = this.props.currentUser ? (
            <button className="userStatus hoverOrange" onClick={this.props.logout}>Log Out<i className="fas fa-sign-out-alt"></i></button>
        ) : null;

        return (
            <div onClick={this.props.onClick}>
                {message}
                {logOut}
            </div>
        );
    }
}

/**
 * a popup for user to login or sign up
 *
 * Props: 
 * - updateCurrentUser: function to update current user
 * - onSuccess: function to set current mode to normal
 * - addUser: function to add user
 * - users: list containing all the users
 */
class UserStatusMenu extends React.Component {
    state = {
        currentComp: "login",
        invalidLogin: false,
    };

    loginCallback = (username, password) => {
        let user = this.props.users.find(function (user, index) {
            return user.username === username;
        });
        if (user === undefined) {
            this.setState({
                invalidLogin: true,
            });
            return false;
        } else if (user.password === password) {
            this.setState({
                invalidLogin: false,
            });
            this.props.updateCurrentUser(user);
            this.props.onSuccess();
            return true;
        } else {
            this.setState({
                invalidLogin: true,
            });
            return false;
        }
    };

    render() {
        const loginComp = (
            <Login
                loginCallback={this.loginCallback}
                invalidLogin={this.state.invalidLogin}
                goToSignup={() => {
                    this.setState({ currentComp: "signup" });
                    this.setState({invalidLogin: false});
                }}
                shouldClear={this.props.shouldClear}
                onPopupExit={this.props.onPopupExit}
            />
        );
        const signupComp = (
            <SignUp
                backToLogin={() => {
                    this.setState({ currentComp: "login" });
                }}
                usersList={this.props.users}
                addUser={(newUser) => {this.props.addUser(newUser); this.loginCallback(newUser.username, newUser.password)}}
                shouldClear={this.props.shouldClear}
                onPopupExit={this.props.onPopupExit}
            />
        );

        return this.state.currentComp === "login" ? loginComp : signupComp;
    }
}

export { UserStatus, UserStatusMenu };