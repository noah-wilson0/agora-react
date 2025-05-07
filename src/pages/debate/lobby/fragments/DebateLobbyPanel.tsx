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
                {ROLES.map((role) => (
                    <RoleRow key={role}>
                        <RoleLabel>{role}</RoleLabel>
                        <ParticipantCard>
                            <AddButton onClick={() => onAddParticipant('찬성', role)}>
                                <PlusIcon>+</PlusIcon>
                            </AddButton>
                        </ParticipantCard>
                    </RoleRow>
                ))}
            </TeamCol>
            {/* 반대팀 */}
            <TeamCol>
                {ROLES.map((role) => (
                    <RoleRow key={role}>
                        <ParticipantCard>
                            <AddButton onClick={() => onAddParticipant('반대', role)}>
                                <PlusIcon>+</PlusIcon>
                            </AddButton>
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
  gap: 18px;
`;
const TeamCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  gap: 8px;
`;
const RoleLabel = styled.div`
  width: 40px;
  text-align: center;
  font-size: 1.15rem;
  font-weight: 500;
  color: #888;
`;
const ParticipantCard = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 32px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  min-height: 56px;
  min-width: 180px;
`;
const HostIcon = styled.span`
  margin-right: 8px;
`;
const ParticipantName = styled.div`
  font-size: 0.97rem;
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
`;
const PlusIcon = styled.span`
  font-size: 22px;
  color: #6bb3f2;
`;

export default DebateLobbyPanel;