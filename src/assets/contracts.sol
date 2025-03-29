// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract CrowdFunding {
    
    
    address manager;
    uint nextCampaignId = 1;
    uint lastDonater = 1;
    bool approval;

    constructor (){
        manager = msg.sender;
    }

    modifier onlyManager () {
        require(msg.sender==manager,"You're not manager");
        _;
    }
    
    mapping (uint=>campaign) campaigns;
    mapping (uint=> address []) donaters;
    // mapping  (uint => uint) donationToCompaign;

    struct campaign { 
        uint campaignId;      
        string campaignName;
        address startedBy;
        uint amountToRaise;
        uint amountRaised;
        uint amountRemaining;
        uint startTime;
        uint endTime;
        bool approval;
        bool isLive;
    }

    struct donater {
        uint donerId;
        address donor;
        uint donationCount;
        uint totalDonation;
        uint donerRank;
    }

    // A function to register a compaign
    /* Working Perfectly */
    
    function registerCampaign (string calldata _camapaignName,uint _amountToRaise,uint _startTime,uint _endTime) public {
        campaigns [nextCampaignId] = campaign (
            {
                campaignName : _camapaignName,
                startedBy : msg.sender,
                amountToRaise : _amountToRaise,
                startTime : _startTime,
                endTime : _endTime,
                campaignId : nextCampaignId,
                amountRaised : 0,
                amountRemaining : _amountToRaise,
                approval : false,
                isLive : false
            }
        );
        nextCampaignId++;
    }


    function donateToCampaign (uint _campaignId ) public payable {
        require(msg.value > 0,"invalid amount to fund");
        require(_campaignId <= nextCampaignId && _campaignId>0,"Invalid campaign id");
        require(campaigns[_campaignId].approval==true,"This campaign is not approved yet");
        require(campaigns[_campaignId].isLive==true,"This campaign is not live yet");
        require(block.timestamp >= campaigns[_campaignId].startTime && block.timestamp <= campaigns[_campaignId].endTime,"Cannot fund at this time");

        campaigns[_campaignId].amountRaised = campaigns[_campaignId].amountRaised + msg.value;
        campaigns[_campaignId].amountRemaining = campaigns[_campaignId].amountRemaining - msg.value;
        donaters[_campaignId].push(msg.sender);
    }

    function showCampaigns () public view returns (campaign [] memory) {
        campaign [] memory campaignList = new campaign [] (nextCampaignId-1);
        for (uint i = 0; i <nextCampaignId-1;i++) {
            campaignList[i] = campaigns[i+1];
        }
        return campaignList;
    }

    function getDonators(uint _campaignId) public view returns (address[] memory) {
    return donaters[_campaignId];
    }

    function managerApproval (uint _campaignId) external onlyManager {
        campaigns[_campaignId].approval = !approval;
    }

    function getApprovalStatus (uint _campaignId) public view returns (bool) {
        return campaigns[_campaignId].approval;
    }

    function startCampaign (uint _campaignId)  external onlyManager() { 
        require(campaigns[_campaignId].approval == true);
        require(block.timestamp >= campaigns[_campaignId].startTime && block.timestamp <= campaigns[_campaignId].endTime);
        campaigns[_campaignId].isLive = true;
    } 

    function withdrawFund (uint _campaignId) public {
        require(msg.sender == campaigns[_campaignId].startedBy,"You're not fund raiser");
        require(block.timestamp >= campaigns[_campaignId].endTime,"Campaign is not end yet");
        require(campaigns[_campaignId].amountRemaining == 0 && campaigns[_campaignId].amountRaised == campaigns[_campaignId].amountToRaise,"Target not completed");
        payable (msg.sender).transfer(campaigns[_campaignId].amountToRaise);
    }

    function withdrawAllFund () onlyManager external {
        payable (manager).transfer(address(this).balance);
    }


    receive() external payable { 
        
    }
}