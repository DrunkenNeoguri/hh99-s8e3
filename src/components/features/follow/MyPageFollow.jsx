import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMyPageFollowFetch, putMyPageFollowFetch } from "../../../app/modules/followSlice";

function MyPageFollow() {
    const dispatch = useDispatch();
    const params = useParams();
    const followState = useSelector((state) => state.follow.data)
    const [followTab, setFollowTab] = useState(false)

    useEffect(()=> {
        dispatch(getMyPageFollowFetch({userId:params.userId}))
        },[followState]);
    
    const onClick = (e)=> {
        e.preventDefault();
        if (followTab === false) {
            return setFollowTab(true)
        } else setFollowTab(false)
    }

    const onClickDelete = (e) => {
        dispatch(putMyPageFollowFetch(e.target.id))
    }

    return (
        <StOutline>
            {followTab === false ? 
                <>
                <StContainer>
                    <StWrapBtn>
                        <StWrapBtnFollow>팔로우</StWrapBtnFollow>
                        <StWrapBtnFollowing type="submit" onClick={onClick}>팔로잉</StWrapBtnFollowing>
                    </StWrapBtn>
                    <div>
                        <StInput placeholder="닉네임을 입력해주세요"/>
                    </div>
                    <div>
                        {followState.follower?.map((x,index)=> {
                        return (<div key={index}>
                            <StProfileBox>
                                    <StProfileImg height="200px" width="200px" src={x.profileImg}></StProfileImg>
                                <StWrapNicknameMbti>
                                    <StNickname>{x.nickname}</StNickname>
                                    <StMbti>{x.mbti}</StMbti>
                                </StWrapNicknameMbti>
                            </StProfileBox>
                                </div>)
                    })}</div>
                </StContainer>
                </>
                : <>
                <StContainer>
                    <StWrapBtn>
                        <StWrapBtnFollowing type="submit" onClick={onClick}>팔로우</StWrapBtnFollowing>
                        <StWrapBtnFollow>팔로잉</StWrapBtnFollow>
                    </StWrapBtn>
                    <div>
                        <StInput placeholder="닉네임을 입력해주세요"/>
                    </div>
                    <div>
                        {followState.following?.map((x,index)=> {
                        return (<div key={index}>
                            <StProfileBox>
                                <StProfileImg height="200px" width="200px" src={x.profileImg}></StProfileImg>
                                    <StWrapNicknameMbti>
                                        <StNickname>{x.nickname}</StNickname>
                                        <StMbti>{x.mbti}</StMbti>
                                    </StWrapNicknameMbti>
                                        <StDeleteFollowBtn type="submit" id={x.userId} onClick={onClickDelete}>언팔로우</StDeleteFollowBtn>
                            </StProfileBox>
                                </div>)
                    })}</div>
                </StContainer>
                </>}
        </StOutline>
    )
}

export default MyPageFollow;

const StOutline=styled.div`
    display:flex;
    margin-top:0px;
    div {
        justify-content: unset;
    }
    justify-content:flex-start;

`

const StContainer=styled.div`
/* background-color:beige; */
    width: 500px;
    height:100%;
    display: grid;
    display: inline-grid;
    column-gap: 20px;
    row-gap: 20px;
    overflow:scroll;

`
const StWrapBtn = styled.div`
    /* background-color:black; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top:60px;
    cursor: pointer;
`
const StWrapBtnFollow = styled.div`
    border-style: inset;
`

const StWrapBtnFollowing = styled.div`
    border-style: outset;
`

const StInput = styled.input`
    border: 2px solid #979797;
    border-radius: 3px;
    padding-left: 10px;
    width: 450px;
    height:55px;
    
`

const StProfileBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    height:100px;
    width: 450px;
    margin:auto;
    :hover{
        background-color:gainsboro;
    }
    cursor: pointer;

`

const StProfileImg = styled.img`
    border:1px solid black;
    border-radius:30px;
    width:60px;
    height:60px;
    margin:20px;

`
const StWrapNicknameMbti=styled.div`
    margin-left:0px;
`
const StNickname = styled.h4`
    left:0;
    display:grid;
    justify-content:left;
    height: 32px;
    margin-bottom: 0px;
`

const StMbti = styled.h6`
    color: gray;
    text-align: left;
    margin-top:0px;
`
const StDeleteFollowBtn = styled.button`
    width: 65px;
    height:35px;
    border-radius:50px;
    background-color:white;
    margin:auto 10px;
    :hover{
        background-color:red;
    }
    cursor: pointer;

`