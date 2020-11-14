docker run -d --env MYSQL_ROOT_PASSWORD="mysql" --env MYSQL_USER="study" --env MYSQL_PASSWORD="study" --name "mysql5.7" -p 3306:3306 mysql/mysql-server:5.7

docker exec -it 5829ecc1d0231ea486a87083747e975930138ab67168dd3a89b529fbe25821e9 /bin/sh;


https://kindmaster.tistory.com/146

1. Mysql 환경설정 확인 하기

콘솔 창에서 mysql 접속 - 접속시 mysql 버전을 확인하세요 버전별로 상세 설정이 조금 다릅니다.

ggachi@ggachinet:~$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 17
Server version: 5.7.19-0ubuntu0.16.04.1 (Ubuntu)

 

저는 ggachi란 계정에 외부 접속 권한을 부여한 후 조회 했기 때문데 ggachi host에 % 가 추가되어있습니다.
참고로 host에 localhost 는 내부접속권한(Default) , %는 외부 접속 권한 표시 입니다.

mysql> use mysql;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> select host,user from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| %         | ggachi           |
| localhost | debian-sys-maint |
| localhost | ggachi           |
| localhost | mysql.session    |
| localhost | mysql.sys        |
| localhost | root             |

이제 부터 위와 같이 환경 설정을 해보겠습니다.


2. 권한 설정하기

특정 IP만 접근 가능하게 설정
mysql> grant all privileges on *.* to ‘ggachi’@‘10.10.0.123’ identified by ‘ggachi의 패스워드’;
특정 IP 대역 접근 가능하게 설정
 mysql> grant all privileges on *.* to ‘ggachi’@‘10.10.0.%’ identified by ‘ggachi의 패스워드’;

모든 IP 접근가능하게 설정하기
mysql> grant all privileges on *.* to ‘ggachi’@‘%’ identified by ‘ggachi의 패스워드’


3. 권한 적용 후 확인

mysql>flush privileges;
mysql>select host,user from user;

4. my.cnf 또는 mysqld.cnf 에서 외부 접속 관련 내용 변경하기

mysql 5.7 버전인 경우 mysqld.cnf  파일의 내용변경
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf

아래 그림과 같이 bind-address =127.0.0.1 부분 주석 처리




 

일부 mysql 버전은 my.cnf 파일의 내용을 변경해야합니다.(몇버전부터 변경되었는지 잘모르겠음)

sudo vi /etc/my.cnf
#bind-address=127.0.0.1
변경내용은 5.7버전과 같음

PS. 이설정을 하지 않고 외부 접속시 아래와 같은 에러 메시지가 나옵니다.
     Can't connect to MySQL server on '서버아이피'(10061)

5. mysql  재시작

sudo /etc/init.d/mysql restart

위 명령어로 재시작 후 외부에서 접속하면 정상 접속됩니다.