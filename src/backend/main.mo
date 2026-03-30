import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

actor {
  type Score = {
    user : Principal;
    score : Nat;
    timestamp : Int;
  };

  type ChatMessage = {
    user : Principal;
    question : Text;
    response : Text;
    timestamp : Int;
  };

  module Score {
    public func compare(score1 : Score, score2 : Score) : Order.Order {
      Nat.compare(score2.score, score1.score);
    };
  };

  let scores = Map.empty<Principal, Score>();
  let chatMessages = Map.empty<Nat, ChatMessage>();

  var nextChatId = 0;

  public shared ({ caller }) func submitScore(score : Nat) : async () {
    let newScore : Score = {
      user = caller;
      score;
      timestamp = Time.now();
    };
    scores.add(caller, newScore);
  };

  public shared ({ caller }) func addChatMessage(question : Text, response : Text) : async () {
    let newMessage : ChatMessage = {
      user = caller;
      question;
      response;
      timestamp = Time.now();
    };
    chatMessages.add(nextChatId, newMessage);
    nextChatId += 1;
  };

  public query ({ caller }) func getAllScores() : async [Score] {
    scores.values().toArray().sort();
  };

  public query ({ caller }) func getAllChatMessages() : async [ChatMessage] {
    chatMessages.values().toArray();
  };

  public query ({ caller }) func getUserScores(user : Principal) : async Score {
    switch (scores.get(user)) {
      case (null) { Runtime.trap("No scores for this user") };
      case (?score) { score };
    };
  };

  public query ({ caller }) func getUserChatHistory(user : Principal) : async [ChatMessage] {
    chatMessages.values().toArray().filter(func(msg) { msg.user == user });
  };
};
