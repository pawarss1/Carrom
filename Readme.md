# Carrom- Clean Strike
## Start Point of the Service is Main.js
## Steps to start the service-
### 1. cd to the working root directory (Goto step 2, if the repo is forked / cloned from github, else jump to the step 3 directly.)
### 2. Execute the command "npm install" -->this will install all the required dependencies
### 3. On successful installation of the dependencies, execute the command to start the service- node Main
### Command to test the service- npm test (this will take around 2-3 seconds, as this will test all the modules used. Also note that the present working directory for this should be root directory.)
## Format to be followed for input
### 1. The input file is InputFile.txt
### 2. Player#>outcome, where outcome >= 1 && outcome <= 6 and # can be either {1, 2}, and the input should be in the alternating state, although there is a check for this alternating player turns.
### The outcomes from 1 to 6 are as follows-
### 1. Strike

### 2. Multistrike

### 3. Red strike

### 4. Striker strike

### 5. Defunct coin

### 6. None

### Sample input- 
### 1>1
### 2>1
### 1>4
### 2>3
### 1>6
### 2>1

## Output is printed on the console