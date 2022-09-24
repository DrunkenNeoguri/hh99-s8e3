//대연  주석은 아직 비교해볼게 많아서 안지워놨습니다
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMbtiTodoListsChallengeFetch,
  getMbtiTodoListsCommentFetch,
  getMbtiTodoListsFetch,
  getTodoListsChallengeFetch,
  getTodoListsCommentFetch,
  getTodoListsFetch,
} from "../../../app/modules/todolistsSlice";
import ChallengeCard from "../../common/ChallengeCard";
import { tokenChecker } from "../../../utils/token";
import LoadingContainer from "../../../utils/loadingState";

// check uncheck

function FeedPageContainer() {
  const [selectSort, setSelectSort] = useState(false);
  const [sortState, setSortState] = useState("최신순");
  // 스토어에서 todolists리듀서 호출
  const feedCard = useSelector((state) => state.todolists.data);
  const [loading, setLoading] = useState(false);
  // mbti선택하기를 했을때 mbti를 불러옴
  const { mbti } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 무한 스크롤 때 사용
  // console.log(inView);
  // console.log(card.length);
  // console.log(mbti);
  console.log(feedCard);

  //feedCard.length 이슈 아래 주석 참조 mbti선택후 다른 페이지 이동후 다시 피드페이지 들어왔을 때 선택했던 mbti가 나타남
  // 첫 렌더링시 토큰/토큰x 에 따라 스토어에서 각각 리듀서 실행
  // useEffect(() => {
  //   console.log(mbti);
  //   // if ( feedCard.length === 0 && tokenChecker() === true) {
  //   if (tokenChecker() === true && mbti === undefined){
  //     dispatch(getTodoListsFetch(true));
  //   } else
  //   dispatch(getTodoListsFetch(false));
  // }, []);

  // useEffect(() => {
  //   console.log(mbti);
  //   // if ( feedCard.length === 0 && tokenChecker() === true) {
  //     if (tokenChecker() === true && mbti === undefined) {
  //         dispatch(getMbtiTodoListsFetch({ login: true, mbti: mbti }));
  //   } else
  //   dispatch(getMbtiTodoListsFetch({ login: false, mbti: mbti }));
  // }, []);

  console.log(tokenChecker(), mbti);

  //처음 로딩될때 로그인/미로로그인 mbti의 유무에 따라서 렌더링
  useEffect(() => {
    console.log("로딩시작");
    setLoading(true);
    if (tokenChecker() === false && mbti === undefined) {
      dispatch(getTodoListsFetch(false));
    } else if (tokenChecker() === false && mbti !== undefined) {
      dispatch(getMbtiTodoListsFetch({ login: false, mbti: mbti }));
    } else if (tokenChecker() === true && mbti === undefined) {
      //김대연 지적 사항 1
      dispatch(getTodoListsFetch(true));
    } else if (tokenChecker() === true && mbti !== undefined)
      dispatch(getMbtiTodoListsFetch({ login: true, mbti: mbti }));
    console.log("로딩끝");
    setLoading(false);
  }, []);

  // 처음에 화면 렌더링될 때는 의미없는 렌더링, mbti 선택후 렌더링될 때 유효함
  useEffect(() => {
    if (mbti === undefined) {
      dispatch(getTodoListsFetch(false));
      // 김대연 지적 사항 2
      // dispatch(getMbtiTodoListsFetch({ login: false, mbti: mbti }));
    } else if (mbti === undefined) {
      dispatch(getTodoListsFetch(true));
    } else if (mbti !== undefined)
      dispatch(getMbtiTodoListsFetch({ login: true, mbti: mbti }));
  }, [mbti]);

  //checkOn의  초기값은 false로 설정
  const [checkOn, checkOff] = useState(false);
  // 도전완료 클릭시 로그인 유무에따라서 1차적으로 거르고 아니면  기본/체크 이미지 변화
  const checkState = () => {
    if (tokenChecker() === false) {
      alert("로그인 후 이용해주세요");
      return;
    } else return checkOff(!checkOn);
  };

  // 최신순 클릭 후 클릭한 값에 따라 변화
  const toggleSortPopUp = () => {
    setSelectSort(!selectSort);
  };

  //최신순 댓글순 도전순 이미지 및 커서 클릭시 선택한 값에 따라 값 출력  토큰유무-> mbti유무
  // 1. 로그인을 했는지 안했는지 2.로그인을했으면 mbti를 설정했는지 안했는지
  const sortDate = (e) => {
    setLoading(true);
    if (tokenChecker() === false) {
      if (mbti === undefined) {
        dispatch(getTodoListsFetch(false));
      } else if (mbti !== undefined) {
        dispatch(getMbtiTodoListsFetch({ login: false, mbti: mbti }));
      }
    } else {
      if (tokenChecker() === true) {
        if (mbti === undefined) {
          dispatch(getTodoListsFetch(true));
        } else if (mbti !== undefined) {
          dispatch(getMbtiTodoListsFetch({ login: true, mbti: mbti }));
        }
      }
    }
    setLoading(false);
    setSortState("최신순");
    setSelectSort(!selectSort);
    console.log(e.target.id);
    // setSelectSort(!selectSort);
  };
  //댓글순 정렬
  const sortComment = (e) => {
    setLoading(true);
    if (tokenChecker() === false) {
      if (mbti === undefined) {
        dispatch(getTodoListsCommentFetch(false));
      } else if (mbti !== undefined) {
        dispatch(getMbtiTodoListsCommentFetch({ login: false, mbti: mbti }));
      }
    } else {
      if (tokenChecker() === true) {
        if (mbti === undefined) {
          dispatch(getTodoListsCommentFetch(true));
        } else if (mbti !== undefined) {
          dispatch(getMbtiTodoListsCommentFetch({ login: true, mbti: mbti }));
        }
      }
    }
    setLoading(false);
    setSortState("댓글순");
    setSelectSort(!selectSort);
  };
  //도전순 정렬
  const sortChallenge = (e) => {
    setLoading(true);
    if (tokenChecker() === false) {
      if (mbti === undefined) {
        dispatch(getTodoListsChallengeFetch(false));
      } else if (mbti !== undefined) {
        dispatch(getMbtiTodoListsChallengeFetch({ login: false, mbti: mbti }));
      }
    } else {
      if (tokenChecker() === true) {
        if (mbti === undefined) {
          dispatch(getTodoListsChallengeFetch(true));
        } else if (mbti !== undefined) {
          dispatch(getMbtiTodoListsChallengeFetch({ login: true, mbti: mbti }));
        }
      }
    }
    setLoading(false);
    setSortState("도전순");
    setSelectSort(!selectSort);
  };
  // MBTI 선택 버튼 클릭시
  const moveToSelectMBTI = () => {
    setLoading(true);
    navigate("/selectmbtifeed");
  };

  return (
    <>
      {loading === true ? <LoadingContainer /> : <></>}
      <StTotalWrap>
        {selectSort === true ? (
          <StShadowBackgroundDiv onClick={toggleSortPopUp}>
            <StPopupBox>
              <StSlideDiv />
              <StSort>
                <StDate
                  style={{
                    color: sortState === "최신순" ? "#ff6d53" : "#8d8d8d",
                  }}
                  onClick={sortDate}>
                  최신순
                </StDate>
                <StDateLine />
                <StComment
                  style={{
                    color: sortState === "댓글순" ? "#ff6d53" : "#8d8d8d",
                  }}
                  onClick={sortComment}>
                  댓글순
                </StComment>
                <StCommentLine />
                <StChallenge
                  style={{
                    color: sortState === "도전순" ? "#ff6d53" : "#8d8d8d",
                  }}
                  onClick={sortChallenge}>
                  도전순
                </StChallenge>
                <StChallengeLine />
                <StCommonBar />
              </StSort>
            </StPopupBox>
          </StShadowBackgroundDiv>
        ) : (
          <></>
        )}
        <StTopWrap>
          <StChallengeWrap>
            {/* 거짓이면 체크안한거 참이면 체크한거 */}
            {checkOn === false ? (
              <StChallengeImg
                onClick={checkState}
                src={process.env.PUBLIC_URL + `/images/unCheck.png`}
                width="17"
                height="17"
                alt="AppearImg"
              />
            ) : (
              <StChallengeImg
                onClick={checkState}
                src={process.env.PUBLIC_URL + `/images/check.png`}
                width="17"
                height="17"
                alt="AppearImg"
              />
            )}
            <StChallengeWord>도전완료 가리기</StChallengeWord>
          </StChallengeWrap>
          <StToggleImgWrap>
            {/* 최신순 클릭시 아래에 정렬 bar 나옴 */}
            <StToggle onClick={toggleSortPopUp}>{sortState}</StToggle>
            <StToggleImg
              onClick={toggleSortPopUp}
              src={process.env.PUBLIC_URL + `/images/Toggle.png`}
              width="12"
              height="6"
              alt="ToggleImg"
            />
          </StToggleImgWrap>
        </StTopWrap>
        <StTodayMyCardWrap>
          {checkOn === true
            ? //isChallenged가 true이면 화면에 띄우면 안된다.
              //아래식이 isChallenged:true를 가지고있다를  어떻게 표현해야하는가
              feedCard
                ?.filter((elem) => elem.isChallenged === false)
                .map((it, idx) => (
                  <ChallengeCard
                    id={it.todoId}
                    data={it}
                    key={idx}></ChallengeCard>
                ))
            : feedCard?.map((it, idx) => (
                <ChallengeCard id={it.todoId} data={it} key={idx}>
                  ?
                </ChallengeCard>
              ))}
          <div className="hi" style={{ height: 80 }}></div>
        </StTodayMyCardWrap>
        <StSelectMbti onClick={moveToSelectMBTI}>MBTI 선택</StSelectMbti>
      </StTotalWrap>
    </>
  );
}
const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 30px;
  padding-bottom: 15px;
  margin: 45px 0px 0px;
  background-color: #edecec;
  width: 500px;
  position: fixed;
  @media screen and (max-width: 500px) {
    width: 360px;
  }
`;
const StChallengeWrap = styled.div`
  display: flex;
`;
const StChallengeImg = styled.img`
  justify-content: left;
  margin: 7px 8px 8px 25px;
  cursor: pointer;
`;
const StChallengeWord = styled.div`
  display: flex;
  margin-right: 235px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #000000;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 175px;
    margin: 0px;
  }
`;
const StToggleImgWrap = styled.div`
  display: flex;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 100%;
    margin: 0px;
  }
`;
const StToggle = styled.div`
  margin-right: 8px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #000000;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    align-items: center;
    width: 100.09px;
    margin: 0px 8px 0px 0px;
    text-align: end;
  }
`;
const StToggleImg = styled.img`
  margin: 13px 0px 13px 0px;
  cursor: pointer;
  align-items: center;
`;
const StTodayMyCardWrap = styled.div`
  flex-direction: column;
  margin-top: 115px;
`;
const StSelectMbti = styled.button`
  display: flex;
  width: 200px;
  position: fixed;
  height: 60px;
  bottom: 110.06px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  margin-left: 150px;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 999px;
  border: 0px;
  background: #ff6d53;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 500px) {
    width: 144px;
    margin-left: 108px;
  }

  transition: ease 0.2s;
  &:hover {
    background: #ffafa1;
    transform: scale(1.03);
  }
`;
const StShadowBackgroundDiv = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: block;
  top: 0;
  width: 500px;
  height: 100%;
  z-index: 10;
`;
const StPopupBox = styled.div`
  background: #ffffff;
  position: absolute;
  width: 500px;
  height: 335px;
  border-radius: 21.3333px 21.3333px 0px 0px;
  z-index: 10;
  bottom: 0;
`;
const StSlideDiv = styled.div`
  background: #e8e8e8;
  width: 42.67px;
  height: 5.33px;
  border-radius: 133.333px;
  margin: 21px auto 28px auto;
`;
const StSort = styled.div`
  display: flex;
  flex-direction: column;
  height: 260px;
  width: 59px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 65px;
  text-align: center;
  color: #000000;
  margin-left: 220px;
  align-items: center;
`;
const StDate = styled.div`
  cursor: pointer;
`;
const StDateLine = styled.div`
  display: flex;
  width: 450px;
  height: 1px;
  background: #c7c7c7;
`;
const StComment = styled.div`
  cursor: pointer;
`;
const StCommentLine = styled.div`
  background: #c7c7c7;
  width: 450px;
  height: 1px;
`;
const StChallenge = styled.div`
  cursor: pointer;
`;
const StChallengeLine = styled.div`
  width: 450px;
  height: 1px;
  background: #c7c7c7;
`;
const StCommonBar = styled.div`
  position: absolute;
  width: 178.23px;
  margin-top: 250px;
  height: 6.65px;
  left: calc(50% - 178.23px / 2 - 1.33px);
  background: #000000;
  border-radius: 133.005px;
`;
export default FeedPageContainer;
