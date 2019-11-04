import React from 'react';

interface MyProps {
    username: string;
    fullname: string;
    email: string;
    avatar: string;
}

interface MyState {
    isEdit: boolean;
}

class UserInfor extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);

        this.state = {
            isEdit: false
        };

        this.handleClickEditBtn = this.handleClickEditBtn.bind(this);
    }

    handleClickEditBtn() {
        const { isEdit } = this.state;
        this.setState({
            isEdit: !isEdit
        });
    }

    render() {
        const { fullname, username, email, avatar } = this.props;
        const { isEdit } = this.state;
        return (
            <div className="col-8 container main d-flex">
                <p>Detail Information</p>
                <div className="mt-2 row">
                    <div className="row">
                        <img src={avatar} id="avatar" alt="" />
                        <span className="ml-3 col"> {username}</span>
                        <input type="file" id="file1" name="image" accept="image/*" capture className={isEdit ? 'mt-2' : 'd-none'} />
                    </div>
                    <form className="mt-4 row">
                        <div className="form-group row small">
                            <span className="spanText">Email Adress</span>
                            <input type="text" className="form-control col ml-5" value={email} readOnly={!isEdit} />
                        </div>
                        <div className="form-group row small ">
                            <span className="spanText">Full Name</span>
                            <input type="text" className="form-control col ml-5" value={fullname} readOnly={!isEdit} />
                        </div>
                        <div className="form-group row small ">
                            <span className="spanText">Password</span>
                            <input type="text" className="form-control col ml-5" />
                        </div>
                        <div className="form-group row small ">
                            <span className="spanText">New Password</span>
                            <input type="text" className="form-control col ml-5" />
                        </div>
                    </form>
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
