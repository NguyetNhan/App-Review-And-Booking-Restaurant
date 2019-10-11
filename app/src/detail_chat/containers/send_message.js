import { connect } from 'react-redux';
import Component from '../components/send_message';
import { onSendMessage } from '../actions';
const mapStateToProps = (state) => {
        return {

        };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onSendMessage: (idConversation, idSender, content) => {
                        dispatch(onSendMessage(idConversation, idSender, content));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);