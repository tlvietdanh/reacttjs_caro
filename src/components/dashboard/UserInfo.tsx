/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import defaultAvatar from '../../assets/default.png';

interface MyProps {
    username: string;
    fullname: string;
    email: string;
    avatar: string;
    status: string;
    handleModifyUserInfo: Function;
}

interface MyState {
    isEdit: boolean;
    isEditPass: boolean;
    tempFullname: string;
    tempOldPassword: string;
    tempNewPassword: string;
    tempEmail: string;
    tempAvatar: string;
    myfile: string;
    error: string;
}

class UserInfor extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        const { fullname, email, avatar } = props;
        this.state = {
            isEdit: false,
            isEditPass: false,
            tempFullname: fullname,
            tempEmail: email,
            tempOldPassword: '',
            tempNewPassword: '',
            tempAvatar: avatar,
            myfile: '',
            error: ''
        };

        this.handleClickEditBtn = this.handleClickEditBtn.bind(this);
        this.handleClickEditPassBtn = this.handleClickEditPassBtn.bind(this);
        this.UploadImage = this.UploadImage.bind(this);
        this.handleChangeInfo = this.handleChangeInfo.bind(this);
    }

    async UploadImage(e: any) {
        const { files } = e.target;
        const reader = new FileReader();
        const myfile = files[0];
        reader.readAsDataURL(myfile);
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                this.setState({
                    tempAvatar: reader.result
                });
            }
        };
        this.setState({
            myfile
        });
    }

    async handleClickEditBtn() {
        const { isEdit, isEditPass } = this.state;
        const { fullname, email, avatar, handleModifyUserInfo } = this.props;
        const { tempFullname, tempEmail, tempAvatar, myfile, tempNewPassword, tempOldPassword } = this.state;
        if (isEdit && (tempEmail !== email || tempFullname !== fullname || tempAvatar !== avatar || isEditPass)) {
            if (
                tempEmail.length === 0 ||
                tempFullname.length === 0 ||
                (isEditPass && (tempNewPassword.length === 0 || tempOldPassword.length === 0))
            ) {
                this.setState({
                    error: 'Invalid information'
                });
                return;
            }
            if (isEditPass && tempNewPassword === tempOldPassword) {
                this.setState({
                    error: 'Your new password is invalid'
                });
                return;
            }
            if (tempAvatar !== avatar) {
                if (isEditPass) {
                    handleModifyUserInfo(tempEmail, tempFullname, myfile, tempOldPassword, tempNewPassword);
                } else {
                    handleModifyUserInfo(tempEmail, tempFullname, myfile, '', '');
                }
            } else if (isEditPass) {
                handleModifyUserInfo(tempEmail, tempFullname, '', tempOldPassword, tempNewPassword);
            } else {
                handleModifyUserInfo(tempEmail, tempFullname, '', '', '');
            }
            this.setState({
                isEdit: !isEdit
            });
        } else {
            this.setState({
                isEdit: !isEdit,
                isEditPass: false,
                tempFullname: fullname,
                tempEmail: email,
                tempAvatar: avatar,
                error: ''
            });
        }
    }

    handleClickEditPassBtn() {
        const { isEditPass } = this.state;
        this.setState({
            isEditPass: !isEditPass
        });
    }

    handleChangeInfo(e: any) {
        const { name, value } = e.currentTarget;
        if (name === 'email') {
            this.setState({
                tempEmail: value
            });
        } else if (name === 'name') {
            this.setState({
                tempFullname: value
            });
        } else if (name === 'oldPass') {
            this.setState({
                tempOldPassword: value
            });
        } else if (name === 'newPass') {
            this.setState({
                tempNewPassword: value
            });
        }
    }

    render() {
        const { tempFullname, tempEmail, tempAvatar, tempNewPassword, tempOldPassword } = this.state;
        const { username, status } = this.props;

        const { isEdit, isEditPass, error } = this.state;
        return (
            <div className="col-8 container main d-flex">
                <div className="mt-2 row">
                    <div className="row flex-column">
                        <div className="row">
                            <img src={tempAvatar === '' ? defaultAvatar : tempAvatar} id="avatar" alt="" />
                            <span className="ml-3 userText1"> {username}</span>
                        </div>
                        <input
                            type="file"
                            id="file1"
                            name="image"
                            accept="image/*"
                            capture
                            className={isEdit ? 'mt-2' : 'd-none'}
                            onChange={this.UploadImage}
                        />
                    </div>
                    <form className="mt-4 row">
                        <div className="form-group row small">
                            <span className="spanText">Email Adress</span>
                            <input
                                type="text"
                                name="email"
                                className="form-control col ml-5"
                                value={tempEmail}
                                readOnly={!isEdit}
                                onChange={this.handleChangeInfo}
                            />
                        </div>
                        <div className="form-group row small ">
                            <span className="spanText">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                className="form-control col ml-5"
                                value={tempFullname}
                                readOnly={!isEdit}
                                onChange={this.handleChangeInfo}
                            />
                        </div>
                        <div className="form-group row small " hidden={!isEditPass}>
                            <span className="spanText">Your Password</span>
                            <input
                                type="text"
                                name="oldPass"
                                className="form-control col ml-5"
                                value={tempOldPassword}
                                onChange={this.handleChangeInfo}
                            />
                        </div>
                        <div className="form-group row small " hidden={!isEditPass}>
                            <span className="spanText">New Password</span>
                            <input
                                type="text"
                                name="newPass"
                                className="form-control col ml-5"
                                value={tempNewPassword}
                                onChange={this.handleChangeInfo}
                            />
                        </div>
                    </form>
                    <div className="row flex-row w-100vh">
                        <button
                            type="submit"
                            className={isEditPass ? 'btn btn-success' : 'btn btn-warning'}
                            onClick={this.handleClickEditPassBtn}
                            hidden={!isEdit}
                        >
                            {isEditPass ? 'Keep Your Pass' : 'Change Your Password'}
                        </button>
                        <div className={error === '' ? 'd-none' : 'invalid-feedback d-block small invaText'}> {error}</div>
                        <div className={status === '' ? 'd-none' : 'invalid-feedback d-block small'}> {status}</div>
                    </div>
                    <button
                        type="submit"
                        className={isEdit ? 'btn btn-warning editBtn' : 'btn btn-primary editBtn'}
                        onClick={this.handleClickEditBtn}
                    >
                        {isEdit ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        );
    }
}

export default UserInfor;
