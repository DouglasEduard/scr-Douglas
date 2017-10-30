CREATE TABLE Company (
	ID uniqueidentifier NOT NULL DEFAULT NEWID(),
	CompanyName VARCHAR(60) NOT NULL,
	CompanyID VARCHAR(30) NOT NULL,
	CONSTRAINT PK_Company PRIMARY KEY (ID)
)

CREATE TABLE CandidateUser (
	ID uniqueidentifier NOT NULL DEFAULT NEWID(),
	CandidateUserName VARCHAR(100) NOT NULL,
	CandidateUserEMail VARCHAR(100) NOT NULL,
	CandidateUserSelectedOption INT NOT NULL,
	CONSTRAINT PK_CandidateUser PRIMARY KEY (ID,CandidateUserEMail)
)