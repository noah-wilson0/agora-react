import React from 'react';
import styled from '@emotion/styled';

export interface Participant {
    id: string;
    username: string;
    isHost?: boolean;
}

interface DebateLobbyPanelProps {
    proParticipants: Participant[];
    conParticipants: Participant[];
    maxCount: number;
    onAddParticipant: (team: '찬성' | '반대', position: string) => void;
}

const ROLES = ['입론', '심문', '반론'];

const DebateLobbyPanel: React.FC<DebateLobbyPanelProps> = ({
    proParticipants,
    conParticipants,
    maxCount,
    onAddParticipant
}) => {
    return (
        <TeamsRow>
            {/* 찬성팀 */}
            <TeamCol>
                {ROLES.map((role, index) => (
                    <RoleRow key={role}>
                        <RoleLabel>{role}</RoleLabel>
                        <ParticipantCard>
                            {proParticipants[index] ? (
                                <ParticipantInfo>
                                    {proParticipants[index].isHost && <HostIcon>👑</HostIcon>}
                                    <ParticipantName>{proParticipants[index].username}</ParticipantName>
                                </ParticipantInfo>
                            ) : (
                                <AddButton onClick={() => onAddParticipant('찬성', role)}>
                                    <PlusIcon>+</PlusIcon>
                                </AddButton>
                            )}
                        </ParticipantCard>
                    </RoleRow>
                ))}
            </TeamCol>
            {/* 반대팀 */}
            <TeamCol>
                {ROLES.map((role, index) => (
                    <RoleRow key={role}>
                        <ParticipantCard>
                            {conParticipants[index] ? (
                                <ParticipantInfo>
                                    {conParticipants[index].isHost && <HostIcon>👑</HostIcon>}
                                    <ParticipantName>{conParticipants[index].username}</ParticipantName>
                                </ParticipantInfo>
                            ) : (
                                <AddButton onClick={() => onAddParticipant('반대', role)}>
                                    <PlusIcon>+</PlusIcon>
                                </AddButton>
                            )}
                        </ParticipantCard>
                        <RoleLabel>{role}</RoleLabel>
                    </RoleRow>
                ))}
            </TeamCol>
        </TeamsRow>
    );
};

const TeamsRow = styled.div`
  display: flex;
  gap: 64px;
  justify-content: center;
`;
const TeamCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 56px;
`;
const WaitCol = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  justify-content: center;
`;
const RoleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;
const RoleLabel = styled.div`
  width: 72px;
  text-align: center;
  font-size: 1.7rem;
  font-weight: 700;
  color: #222;
`;
const ParticipantCard = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 48px 64px;
  border: 2px solid #ddd;
  border-radius: 16px;
  background: #f9f9f9;
  min-height: 120px;
  min-width: 320px;
  box-sizing: border-box;
`;
const ParticipantInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  text-align: center;
`;
const HostIcon = styled.span`
  font-size: 1.2rem;
`;
const ParticipantName = styled.div`
  font-size: 1.15rem;
  color: #333;
  font-weight: 500;
`;
const AddButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  text-align: center;
`;
const PlusIcon = styled.span`
  font-size: 32px;
  color: #6bb3f2;
`;

export default DebateLobbyPanel;