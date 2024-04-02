import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../user.interface';

interface Team {
  name: string;
  members: any[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any[] = [];
  pageSize = 20;
  currentPage = 1;
  searchName = '';
  selectedDomain: string | null = null;
  selectedGender: string | null = null;
  selectedAvailability: string | null = null;
  team: Team | null = null;
  user: User[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
    });
  }
  get filteredData(): any[] {
    return this.data.filter((item) => {
      const nameMatch = item.first_name.toLowerCase().includes(this.searchName.toLowerCase());
      const domainMatch = this.selectedDomain === null || item.domain === this.selectedDomain;
      const genderMatch = this.selectedGender === null || item.gender === this.selectedGender;
      const availabilityMatch =
        this.selectedAvailability === null || item.available=== this.selectedAvailability;
        console.log(this.selectedAvailability)
        // (this.selectedAvailability && item.available) ||
        // (!this.selectedAvailability && !item.available);
  
      return nameMatch && domainMatch && genderMatch && availabilityMatch;
    });
  }
  
  
  
  
  
  
  
  


  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredData.slice(startIndex, endIndex);
  }

  addToTeam(user?: User): void {
    if (!this.team) {
      this.team = { name: 'My Team', members: [] };
    }

    if (user) {
      const isDomainAlreadyInTeam = this.team.members.some((member) => member.domain === user.domain);

      if (!isDomainAlreadyInTeam) {
        this.team.members.push(user);
        console.log(`${user.first_name} ${user.last_name} added to the team.`);
      } else {
        console.log(`${user.first_name} ${user.last_name} is already in the team.`);
      }
    } else {
      const selectedUsers = this.filteredData.filter((user) => user.selected);

      selectedUsers.forEach((selectedUser) => {
        const isDomainAlreadyInTeam = this.team?.members.some((member) => member.domain === selectedUser.domain);

        if (!isDomainAlreadyInTeam) {
          this.team?.members.push(selectedUser);
          console.log(`${selectedUser.first_name} ${selectedUser.last_name} added to the team.`);
        } else {
          console.log(`${selectedUser.first_name} ${selectedUser.last_name} is already in the team.`);
        }
      });
    }
    window.alert("Successfully added");
  }

  get teamMembersForDisplay(): User[] {
    return this.showTeamDetail ? this.team?.members || [] : this.filteredData;
  }

  showTeamDetail: boolean = false;
  showMainDetail: boolean = true;
  
  showTeamDetails(): void {
    this.showTeamDetail = true;
    this.showMainDetail = false;
  }
  hideTeamDetails(): void {
    this.showTeamDetail = false;
    this.showMainDetail = true;
  }

  reload(){
    window.location.reload();
  }
}
