'use client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MyTable from '@/components/table/Table';

const entitiesData = [];

// Helper function to generate a random phone number
function generateRandomPhoneNumber() {
   const digits = Math.floor(Math.random() * 9000000000) + 1000000000;
   return `+1${digits}`;
}

// Helper function to generate a random name
function generateRandomName() {
   const names = [
      'John',
      'Jane',
      'David',
      'Emma',
      'Emily',
      'Michael',
      'Olivia',
      'William',
      'Sophia',
      'Daniel',
      'Isabella'
   ];
   const randomIndex = Math.floor(Math.random() * names.length);
   return names[randomIndex];
}

// Helper function to generate a random email
function generateRandomEmail(name) {
   const emailProviders = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com'
   ];
   const randomProviderIndex = Math.floor(
      Math.random() * emailProviders.length
   );
   const provider = emailProviders[randomProviderIndex];
   const randomSuffix = Math.floor(Math.random() * 10000);
   return `${name.toLowerCase()}${randomSuffix}@${provider}`;
}

for (let i = 1; i <= 46; i++) {
   const id = i;
   const name = generateRandomName();
   const email = generateRandomEmail(name);
   const phone = generateRandomPhoneNumber();

   entitiesData.push({ id, name, email, phone });
}

const columns = ['Id', 'Name', 'Email', 'Phone'];

const Fixture = () => {
   return (
      <DashboardLayout>
         <MyTable columns={columns} entities={entitiesData} />
      </DashboardLayout>
   );
};

export default Fixture;
