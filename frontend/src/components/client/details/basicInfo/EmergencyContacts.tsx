import React from 'react';
import { connect } from 'react-redux';
import { Contact } from '../../../../redux/basicInfo/state';
import { handleContactsChange } from '../../../../redux/basicInfo/actions';
import { ThunkDispatch, IRootState } from '../../../../redux/store';


interface IEmergencyProps {
    id: number
    contacts: Contact[],
    isEditing: boolean,

    // fetchEmergencyContacts: (elderlyID: number) => void,
    handleContactsChange: (newContacts: Contact[]) => void
}


class EmergencyContacts extends React.Component<IEmergencyProps, {}>{

    // componentDidMount() {
    //         console.log("componentDidMount")
    //         this.props.fetchEmergencyContacts(this.props.id)
    // }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        console.log("handleChange")

        const key = event.target.name;
        const value = event.target.value;
        console.log(key, value)

        const updatedContacts = this.props.contacts.slice();
        console.log(updatedContacts)
        const updatedInfo = { ...updatedContacts[index], [key]: value }
        console.log(updatedContacts, updatedInfo)

        updatedContacts.splice(index, 1, updatedInfo)
        console.log(updatedContacts)
        this.props.handleContactsChange(updatedContacts);
    }

    render() {
        console.log("emergencyContacts")
        console.log(this.props.contacts)
        return (
            <>
                {(!this.props.isEditing) ?
                    this.props.contacts.map(
                        (contact, index) => (
                            <label key={index}>
                                <div><span className="details-field">緊急聯絡人{index + 1}：</span>{contact.name}</div>
                                <div><span className="details-field">聯絡電話：</span>{contact.telephone}</div>
                            </label>
                        )
                    )
                    :
                    this.props.contacts.map(
                        (contact, index) => (
                            <label key={index}>
                                <div><span className="details-field">緊急聯絡人{index + 1}：</span><input type="text" name="name" value={contact.name} onChange={(event) => this.handleChange(event, index)} /></div>
                                <div><span className="details-field">聯絡電話：</span><input  type="number" name="telephone" value={contact.telephone} onChange={(event) => this.handleChange(event, index)} /></div>
                            </label>
                        )
                    )}
            </>)
    }
}


const mapStateToProps = (state: IRootState) => {
    console.log("emergencyContacts - mapStateToProps")
    console.log(state.basicInfo.contacts)
    return {
        contacts: state.basicInfo.contacts
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        // fetchEmergencyContacts: (elderlyID: number) => dispatch(fetchEmergencyContacts(elderlyID)),
        handleContactsChange: (contacts: Contact[]) => dispatch(handleContactsChange(contacts)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyContacts);