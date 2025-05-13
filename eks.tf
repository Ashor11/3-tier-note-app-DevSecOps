//create vpc with one subnet and create basic free instance in this subnet 
provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "eks" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "eks"
  }
}

resource "aws_subnet" "eks" {
  vpc_id                  = aws_vpc.eks.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true    //to make this subnet accessible from internet

  tags = {
    Name = "eks"
  }         
  }
resource "aws_security_group" "eks" {  //create security group for this instance to allow all to all and all from all
    vpc_id = aws_vpc.eks.id
    
    ingress {
        from_port   = 0
        to_port     = 0
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }   
    }
 
resource "aws_instance" "eks" {  //create instance in this subnet
  ami           =  "ami-0f88e80871fd81e91" //amazon linux 2 ami
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.eks.id
  vpc_security_group_ids = [aws_security_group.eks.id]
  associate_public_ip_address = true
  tags = {
    Name = "eks"
  }
}
