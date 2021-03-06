import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import CommentInput from './CommentInput';
import message from '../../assets/message.svg';
 import './comment.css'
import styled from 'styled-components';

const Like = styled.div`  
  font-weight: bold;
  display: flex;
  margin-left: 12px;
`;

const PostInterface = styled.div`
  display: flex;
  padding: 5px;
`;



class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: '',
      likes: 0,
      notLiked: false
    };
  }
componentDidMount = () => {
  this.setState({
    comments: this.props.comments,
    comment: '',
    likes: this.props.likes,
    notLiked: true
  })
}




toggleLike = () => {
  this.setState(previousState => {
    return {
      notLiked: !previousState.notLiked,

    }
  })
  {this.state.notLiked ?
  this.setState(previousState => {
    return {
      likes: previousState.likes +=1,
    }
  })
  :
  this.setState(previousState => {
    return {
      likes: previousState.likes -=1,
    }
  })
  }
}



commentHandler = event => {
  this.setState({comment: event.target.value})
}

handleCommentSubmit = e => {
  e.preventDefault();
  const newComment = { text: this.state.comment, username: localStorage.getItem('username')};
  const comments = this.state.comments.slice();
  comments.push(newComment);
  this.setState({ comments, comment: ''});
};


  render(props) {
    return (
      <div>
        <PostInterface>
        <span onClick = {this.toggleLike} className ={`heart-size fa style ${this.state.notLiked ?  '' : ' red'}`} >
&#xf08a;
</span>
          <img  alt='message icon' src={message}/>
          </PostInterface>
          <Like>
            {this.state.likes} likes
          </Like>
        {this.state.comments.map((c, i) => <Comment key={i} comment={c} />)}
        <CommentInput  
        comment={this.state.comment}
        submitComment={this.handleCommentSubmit}
        changeComment={this.commentHandler}
        />
      </div>
    );
  }
}

 
CommentSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, username: PropTypes.string })
  )
};
 


export default CommentSection;